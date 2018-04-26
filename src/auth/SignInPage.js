import React, { Component } from 'react';
import { AUTH_TICKET_ENDPOINT } from '../config.js';

export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
  }

  /**
   * Swap Google ID token with auth ticket from server and pass to callback.
   * @param {*} googleUser
   */
  onSignIn(googleUser) {
    var playerId = googleUser.getBasicProfile().getId();
    var idToken = googleUser.getAuthResponse().id_token;
    // fetch from API
    fetch(`${AUTH_TICKET_ENDPOINT}?playerId=${playerId}&idToken=${idToken}`)
      .then(response => response.json())
      .then(ticket => {
        this.props.onSignIn(playerId, JSON.stringify(ticket))
      });
  }

  componentDidMount() {
    window.gapi.signin2.render('g-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSignIn
    });
  }

  render() {
    return (
      <div id="g-signin2"></div>
    );
  }
}
