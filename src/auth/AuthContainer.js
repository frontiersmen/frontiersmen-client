import React, { Component } from 'react';
import SignInPage from './SignInPage.js'
// import MockSignInPage from './MockSignInPage.js'

export default class AuthContainer extends Component {
  render() {
    if (this.props.signedIn) {
      return this.props.children;
    } else {
      return <SignInPage onSignIn={this.props.onSignIn} />
      // return <MockSignInPage onSignIn={this.onSignIn} />
    }
  }
}
