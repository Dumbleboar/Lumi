import * as express from 'express';
import { IRequest } from '../middleware/auth';

import { DB } from '../db';

export default class Controller<T> {
    private type: string;

    constructor(type: string) {
        this.type = type;

        this.list = this.list.bind(this);
        this.read = this.read.bind(this);
    }

    public list(req: IRequest, res: express.Response) {
        const db = new DB(res);

        db.find({ type: this.type }, req.query, (docs: T[]) => {
            const o = {};
            o[this.type + 's'] = docs;
            res.status(200).json(o);
        });
    }

    public read(req: IRequest, res: express.Response) {
        const db = new DB(res);
        db.findById(req.params.id, (doc: T) => {
            const o = {};
            o[this.type + 's'] = [doc];
            res.status(200).json(o);
        });
    }

    public update(req: IRequest, res: express.Response) {
        const db = new DB(res);

        db.update_one(req.params.id, req.body, (doc: T) => {
            res.status(200).json(doc);
        });
    }

    public delete(req: IRequest, res: express.Response) {
        const db = new DB(res);

        db.delete(req.params.id);
    }
}
