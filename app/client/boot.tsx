import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Router from './router';
import store from 'client/state';

declare var process;

import Theme from './style/theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

if (localStorage.getItem('lumi_version') !== process.env.VERSION) {
    localStorage.clear();
}
localStorage.setItem('lumi_version', process.env.VERSION);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
            <Router history={history} />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('lumi')
);
