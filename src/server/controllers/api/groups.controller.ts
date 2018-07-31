import * as express from 'express';
import * as raven from 'raven';
import {uniq, assign} from 'lodash';
import {IRequest} from '../../middleware/auth';

import {IUser} from 'lib/users/types';
import {IGroup} from 'lib/groups/types';

import {DB} from '../../db';

import Controller from '../controller';

class GroupController extends Controller<{}> {
    constructor() {
        super('group');
    }
    public list(req: IRequest, res: express.Response) {
        const db = new DB(res);

        db.view('group', 'list', {}, docs => {
            res.status(200).json(docs);
        });
    }

    public create(req: IRequest, res: express.Response) {
        const db = new DB(res);

        const new_group: IGroup = {
            _id: undefined,
            type: 'group',
            name: 'no name',
            flow_order: [],
            created_at: new Date()
        };

        assign(new_group, req.body);

        db.insert(new_group, group => {
            res.status(200).json(group);
        });
    }

    public read(req: IRequest, res: express.Response) {
        const db = new DB(res);

        db.view(
            'group',
            'with_collections_and_users',
            {key: req.params.id},
            docs => {
                res.status(200).json(docs);
            }
        );
    }

    public for_user(req: IRequest, res: express.Response) {
        const db = new DB(res);

        db.view('group', 'for_user', {key: req.params.user_id}, docs => {
            res.status(200).json(docs);
        });
    }

    public delete(req: IRequest, res: express.Response) {
        const db = new DB(res);

        db.find(
            {
                groups: {$in: [req.params.id]},
                type: 'user'
            },
            {limit: 1000},
            (users: IUser[]) => {
                users.map(user =>
                    user.groups.filter(group_id => group_id !== req.params.id)
                );

                db.insertMany(users, {}, () => {
                    db.delete(req.params.id);
                    res.status(200).end();
                });
            }
        );
    }

    public action(req: IRequest, res: express.Response) {
        try {
            const db = new DB(res);

            db.findById(req.params.id, group => {
                switch (req.body.type) {
                    case 'ADD_USER_TO_GROUP':
                        db.findById(req.body.payload.user_id, user => {
                            user.groups = uniq([...user.groups, req.params.id]);

                            if (!user.flow) {
                                user.flow = {};
                            }

                            user.flow[req.params.id] = [];

                            db.update_one(user._id, user);
                        });

                        break;
                    case 'REM_USER_FROM_GROUP':
                        db.findById(req.body.payload.user_id, user => {
                            user.groups = uniq(
                                user.groups.filter(
                                    group_id => group_id !== req.params.id
                                )
                            );

                            user.flow[req.params.id] = undefined;

                            db.update_one(user._id, user);
                        });
                        break;
                    default:
                        break;
                }
            });
        } catch (err) {
            raven.captureException(err);
            res.status(500).json(err);
        }
    }
}

export default GroupController;
