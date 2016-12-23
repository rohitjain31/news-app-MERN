import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Home from './views/home';
import MyHeadlines from './views/myheadlines';

import 'flexboxgrid';
import './app.css';

const muiTheme = getMuiTheme({
  palette: {
		primary1Color: '#ff5a63',
		accent1Color: white
  }
});

injectTapEventPlugin();

ReactDOM.render(
	<MuiThemeProvider muiTheme={muiTheme}>
		<Router history={hashHistory}>
      <Route path='/' component={Home} />
			<Route path="/myheadline" component={MyHeadlines} />
		</Router>
	</MuiThemeProvider>,
  document.getElementById('mountapp')
);
