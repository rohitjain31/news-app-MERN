import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router';

import './appbar.css';
import LoginForm from '../login';
import Register from '../signup';

export default class AppNav extends React.Component {
  constructor() {
    super();
    this.state = {
      isloggedIn: Boolean(window.localStorage.getItem('loggedIn') === 'true')
    };
  }

  // Passing this function as props in LoginForm comonent
  isLoggedIn = (value) => {
    this.setState({isloggedIn: value});
  }

  render () {
    const isUserLoggedIn = window.localStorage.getItem('loggedIn');

    // Creating a Link Tag for headline route
    const myHeadlineButton = (
      <Link
        to={'/myheadline'}
        target='_self'
        className='headLineLink'
      >
        Headlines
      </Link>
    );

		const rightElem = (
      // creating button on app bar based on login condition
      <div className='rightAppElem'>
        {isUserLoggedIn === 'true' ? myHeadlineButton : <Register />}
        <LoginForm isloggedIn={this.isLoggedIn} />
      </div>
		);

    // creating route for title
    const title = (
      <Link
        to={'/'}
        target='_self'
        className='titleLink'
      >
        News World
      </Link>
    );

		return (
			<div>
				<AppBar
          className="appBar"
          showMenuIconButton={false}
          title={title}
          onTitleTouchTap={this.handleTouchTap}
          iconElementRight={rightElem}
          />
			</div>
		);
	}
}
