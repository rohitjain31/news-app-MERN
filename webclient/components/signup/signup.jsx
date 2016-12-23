import React from 'react';
import axios from 'axios';
import validator from 'validator';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

const errorMessage = {
  errorName: 'provide your name',
  errorEmail: 'provide valid email id',
  errorUserName: 'provide unique user name',
  errorPassword: 'provide your password',
  errorPassword2: 'Password does not match',
  errorValidUser: 'user name is already taken!!',
  errorValidEmail: 'Email id is already registered'
};

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      emailErrorText: '',
      userNameErrorText: '',
      passwordErrorText: '',
      isValidName: true,
      isValidEmail: true,
      isvalidUserName: true,
      isValidPassword: true,
      isValidRePassword: true,
      openSnackBar: false
    };
  }

  handleRequestClose = () => {
    this.setState({openSnackBar: false});
  }

  handleSignupForm = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleSubmit = () => {
    this.setState({
      isValidName: true,
      isValidEmail: true,
      isvalidUserName: true,
      isValidPassword: true,
      isValidRePassword: true
    });
    const isValidName = validator.isAlpha(this.refs.name.getValue());
    const isValidEmail = validator.isEmail(this.refs.email.getValue());
    const isvalidUserName = !validator.isEmpty(this.refs.username.getValue());
    const isValidPassword = !validator.isEmpty(this.refs.password.getValue());
    const isValidRePassword = !validator.isEmpty(this.refs.repassword.getValue());

    if(!isValidName) {
      this.setState({isValidName});
    }

    if(!isValidEmail) {
      this.setState({
        isValidEmail: false,
        emailErrorText: errorMessage.errorEmail
      });
    }

    if(!isValidPassword) {
      this.setState({
        isValidPassword: false,
        passwordErrorText: errorMessage.errorPassword
      });
    }

    if(!isValidRePassword) {
      this.setState({
        isValidRePassword: false,
        passwordErrorText: errorMessage.errorPassword
      });
    }

    let isValidForm = false;
    if(this.refs.password.getValue() === this.refs.repassword.getValue()) {
      isValidForm = isValidName && isValidEmail && isvalidUserName && isValidPassword;
    }
    else if(isValidPassword || isValidRePassword) {
      this.setState({
        isValidPassword: false,
        isValidRePassword: false,
        passwordErrorText: errorMessage.errorPassword2
      });
    }

    if(isValidForm) {
      const data = {
        name: this.refs.name.getValue(),
        email: this.refs.email.getValue(),
        userName: this.refs.username.getValue(),
        password: this.refs.password.getValue()
      };
      axios.post('/signup', data)
           .then((response) => {
            // console.log(response);
             if(response.data === 'user information saved to database') {
               this.setState({
                 open: false
               }, () => {
                 this.setState({openSnackBar: true});
               });
             }
           });
    }
  }

  render() {
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
          label='Register'
          secondary={true}
          onTouchTap={this.handleSignupForm}
        />
        <Dialog
          title="Sign Up"
          titleStyle={{color: '#FF5A63'}}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <TextField
          ref='name'
          errorText={!this.state.isValidName ? errorMessage.errorName : null}
          floatingLabelText="Name"
        /><br />
        <TextField
          ref='email'
          errorText={!this.state.isValidEmail ? this.state.emailErrorText : null}
          floatingLabelText="Email id"
          fullWidth={true}
        /><br />
        <TextField
          ref='username'
          errorText={!this.state.isvalidUserName ? this.state.userNameErrorText : null}
          floatingLabelText="Enter Desired user name"
          fullWidth={true}
        /><br />
        <TextField
          ref='password'
          type='password'
          errorText={!this.state.isValidPassword ? this.state.passwordErrorText : null}
          floatingLabelText="Enter password"
          fullWidth={true}
        /><br />
        <TextField
          ref='repassword'
          type='password'
          errorText={!this.state.isValidRePassword ? this.state.passwordErrorText : null}
          floatingLabelText="Re enter password"
          fullWidth={true}
        />
        </Dialog>
        <Snackbar
          open={this.state.openSnackBar}
          message="User Registered successfully!!!"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
