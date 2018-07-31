import * as express from 'express';
import * as raven from 'raven';
import {IRequest} from '../../middleware/auth';
import * as bcrypt from 'bcrypt-nodejs';
import {assign} from 'lodash';

import {IUser} from 'lib/users/types';

import {DB} from '../../db';

import Controller from '../controller';

class UsersController extends Controller<{}> {
    constructor() {
        super('user');
    }
    public list(req: IRequest, res: express.Response) {
        const db = new DB(res);

        db.view('user', 'list', req.query, docs => {
            res.status(200).json(docs);
        });
    }

    public read(req: IRequest, res: express.Response) {
        const db = new DB(res);

        db.view('user', 'with_groups', {key: req.params.id}, docs => {
            res.status(200).json(docs);
        });
    }

    public create(req: IRequest, res: express.Response) {
        const db = new DB(res);

        const new_user: IUser = {
            _id: undefined,
            type: 'user',
            name: 'no name',
            level: 0,
            groups: [],
            last_login: undefined,
            last_active: undefined,
            online: false,
            location: '/',
            password: undefined,
            flow: []
        };

        assign(new_user, req.body, {password: undefined});

        db.insert(new_user, user => {
            res.status(200).json(user);
        });
    }

    public init(req: IRequest, res: express.Response) {
        try {
            const db = new DB(res);

            db.view('user', 'init', {key: req.params.id}, docs =>
                res.status(200).json(docs)
            );
        } catch (err) {
            res.status(500).json(err);
            raven.captureException(err);
        }
    }
}

export default UsersController;
