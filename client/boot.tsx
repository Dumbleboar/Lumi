import * as React 					from 'react';
import * as ReactDOM 				from 'react-dom';
import { Provider }           		from 'react-redux';

import { browserHistory } 			from 'react-router';
import { syncHistoryWithStore } 	from 'react-router-redux';

import Router 						from './router';
import store 						from 'client/state';

import * as injectTapEventPlugin 	from 'react-tap-event-plugin';

declare var process;

declare var require: {
	<T>(path: string): T;
	(paths: string[], callback: (...modules: {}[]) => void): void;
	ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

require('file?name=[name].[ext]!./index.html');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import darkBaseTheme 				from 'client/style/Theme';
import getMuiTheme 					from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider 			from 'material-ui/styles/MuiThemeProvider';

if (localStorage.getItem('lumi_version') !== process.env.VERSION) {
	localStorage.clear();
}
localStorage.setItem('lumi_version', process.env.VERSION );

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
			<Router history={history} />
		</MuiThemeProvider>
	</Provider>
	,
	document.getElementById('lumi'),
);