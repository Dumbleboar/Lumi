import * as _debug from 'debug';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';

import routes from '../routes';

const debug = _debug('server');

const app: express.Application = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(compression());

app.use(routes);

export default app;
