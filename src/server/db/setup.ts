import * as _debug from 'debug';
import * as superagent from 'superagent';
import * as raven from 'raven';

const debug = _debug('lumi:db:setup');

export default function(done: () => void) {
    debug('check for db: ' + process.env.DB);
    superagent
        .get(process.env.DB_HOST + '/' + process.env.DB)
        .then(res => {
            debug(process.env.DB + ': OK');
            done();
        })
        .catch(err => {
            if (err.status === 404) {
                debug(process.env.DB + ': not OK');

                debug('creating db ' + process.env.DB);

                superagent
                    .put(process.env.DB_HOST + '/' + process.env.DB)
                    .then(res => {
                        debug(process.env.DB + ': created');
                        superagent
                            .put(
                                process.env.DB_HOST +
                                    '/' +
                                    process.env.DB +
                                    '/admin'
                            )
                            .send({
                                _id: 'admin',
                                name: 'admin',
                                level: 4,
                                type: 'user'
                            })
                            .then(r => {
                                done();
                            });
                    })
                    .catch(error => {
                        debug('ERROR: ', error);
                    });
            }
            raven.captureException(err);
        });
}
