import { assign, noop } from 'lodash';
import { DB } from '../../db';
import event from '../../core/event';

import { ICollectionData } from 'lib/collections/types';
import { ICardData } from 'lib/cards/types';

export function submit_overdue_collections() {
    const db = new DB();

    db.find(
        {
            due_date: { $lte: new Date() },
            submitted: false,
            type: 'data',
            data_type: 'collection'
        },
        { limit: 30 },
        docs => {
            docs.forEach(doc => submit_collection(doc._id));
        }
    );
}

export function submit_collection(collection_data_id: string) {
    const db = new DB();

    db.update_one(
        collection_data_id,
        {
            submitted: true,
            submit_date: new Date()
        },
        (collection_data: ICollectionData) => {
            event.emit('COLLECTIONS/COLLECTION_SUBMITTED', collection_data);
        }
    );
}

export function complete_collection(id: string) {
    const db = new DB();

    // collection_data.submitted = true;
    // collection_data.submit_date = new Date();
    const user_id = id.split('-')[0];
    const collection_id = id.split('-')[1];

    db.find(
        {
            collection_id,
            user_id,
            type: 'data',
            data_type: 'card'
        },
        { limit: 40 },
        (data: ICardData[]) => {
            const correct = data
                .filter(
                    d =>
                        d.data_type === 'card' &&
                        d.card_type !== 'video' &&
                        d.card_type !== 'text' &&
                        d.is_graded
                )
                .reduce((p, a) => p + (a.score || 0), 0);

            const num_tasks = data.filter(
                d =>
                    d.data_type === 'card' &&
                    d.card_type !== 'video' &&
                    d.card_type !== 'text' &&
                    d.is_graded
            ).length;

            data.forEach(d => {
                d.show_answer = true;
                d.processed = true;
                db.save(d);
            });

            // collection_data.score = correct / num_tasks;

            db.update_one(
                id,
                {
                    completed: true,
                    score: correct / num_tasks
                },
                doc => {
                    event.emit('COLLECTIONS/COLLECTION_COMPLETED', doc);
                }
            );

            // db.save(collection_data, () => {

            // });
        }
    );
}

export function uncomplete_collection(id: string) {
    const db = new DB();

    db.update_one(id, { completed: false }, doc => {
        event.emit('COLLECTIONS/COLLECTION_UNCOMPLETED', doc);
    });
}

export function unsubmit_collection(id: string) {
    const db = new DB();

    db.update_one(id, { submitted: false, submit_date: undefined }, doc => {
        event.emit('COLLECTIONS/COLLECTION_UNSUBMITTED', doc);
    });
}

export function delete_assignment(id: string) {
    const db = new DB();

    db.findById(id, doc => {
        db.delete(id, () => {
            event.emit('COLLECTIONS/ASSIGNMENT_DELETED', doc);
        });
    });
}

export function assign_collection(
    db: DB,
    user_id: string,
    collection_data,
    cb?: (res) => void
) {
    const _data: ICollectionData = {
        user_id,
        collection_id: collection_data.collection_id,
        _id: user_id + '-' + collection_data.collection_id,
        data_type: 'collection',
        submitted: false,
        submit_date: undefined,
        score: 0,
        type: 'data',
        is_graded: true,
        created_at: new Date(),
        updated_at: undefined,
        due_date: undefined,
        auto_complete: false,
        completed: false
    };

    const data: ICollectionData = assign(_data, collection_data);

    db.insert(data, res => {
        cb ? cb(res) : noop();
        event.emit(
            'COLLECTIONS/COLLECTION_ASSIGNED',
            assign(data, { _id: res.id })
        );
    });
}
