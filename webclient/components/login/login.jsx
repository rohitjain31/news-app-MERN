import React, {Component} from 'react';
import { hashHistory } from 'react-router';
import axios from 'axios';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// const errorMessage = {
//   usernameError1: 'user does not exist!!!',
//   passwordError1: 'incorrect password',
//   usernameError2: 'provide your user name',
//   passwordError2: 'provide your password'
// };

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      // loggedIn: false,
      loginErrorMessage: '',
      loggedIn: Boolean(window.localStorage.getItem('loggedIn') === 'true'),
      isUserError: false,
      isPasswordError: false,
      usernameError: '',
      passwordError: ''
    };
  }

  // Handling Login/Logout request based on user is logged in or not
  handleLoginForm = () => {
    if(this.state.loggedIn) {
      this.setState({
        loggedIn: false
      });
      this.props.isloggedIn(false);
      window.localStorage.setItem('loggedIn', false);
      axios.get('/logout').then(() => {
        hashHistory.push('/');
      }).catch((error) => {
        console.log(error);
      });
    }
    else {
      this.setState({open: true});
    }
  }

  // close login dialouge box
  handleClose = () => {
    this.setState({open: false});
  };

  // handle login request on click of submitting username and password
  handleSubmit = () => {
    this.setState({
      isUserError: false,
      isPasswordError: false
    });
    const isUserNameValid = this.refs.username.getValue() !== '';
    const isPasswordValid = this.refs.password.getValue() !== '';
    const isValid = isUserNameValid && isPasswordValid;

    // if(!isUserNameValid) {
    //   this.setState({
    //     isUserError: true,
    //     usernameError: errorMessage.usernameError2
    //   });
    // }

    // if(!isPasswordValid) {
    //   this.setState({
    //     isPasswordError: true,
    //     passwordError: errorMessage.passwordError2
    //   });
    // }

    if(isValid) {
      const data = {
        username: this.refs.username.getValue(),
        password: this.refs.password.getValue()
      };
      axios.post('/login', data).then((response) =>{
        if(response.data === 'successfully loggedIn!!!') {
          this.setState({
            open: false,
            loggedIn: true,
            loginErrorMessage: ''
          }, () => {
            this.props.isloggedIn(true);
            window.localStorage.setItem('loggedIn', true);
          });
        }
        // if(response.data === errorMessage.usernameError1) {
        //   this.setState({
        //     isUserError: true,
        //     usernameError: errorMessage.usernameError1
        //   });
        // }
        // else if(response.data === errorMessage.passwordError1) {
        //   this.setState({
        //     isPasswordError: true,
        //     passwordError: errorMessage.passwordError1
        //   });
        // }
        // else {
        //   this.setState({
        //     open: false,
        //     loggedIn: true
        //   });
        // }
      })
      .catch((error) => {
        if(error.response.data === 'Unauthorized') {
          this.setState({loginErrorMessage: 'Login Failed!!! Try again'});
        }
      });
    }
  }

  render() {
    // const userLoggedIn = window.localStorage.getItem('logggedIn');
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />
    ];

    return (
      <div>
        <FlatButton
          secondary={true}
          label={this.state.loggedIn ? 'log out' : 'login'}
          onTouchTap={() => {
            this.handleLoginForm();
          }}
        />
        <Dialog
          title="Login"
          titleStyle={{color: '#FF5A63'}}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <TextField
          ref='username'
          errorText={this.state.isUserError ? this.state.usernameError : null}
          floatingLabelText="Enter your user name"
          fullWidth={true}
        /><br />
        <TextField
          ref='password'
          type='password'
          errorText={this.state.isPasswordError ? this.state.passwordError : null}
          floatingLabelText="Enter password"
          fullWidth={true}
        />
        {this.state.loginErrorMessage}
        </Dialog>
      </div>
    );
  }
}

LoginForm.propTypes = {
  // isloggedIn: React.propTypes.bool
};
