import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import './App.css';
import AuthContainer from './auth/AuthContainer.js'
import LobbyView from './lobby/LobbyView.js'
import PregameView from './pregame/PregameView.js';
import TicTacToeGameView from './tictactoe/TicTacToeGameView.js';
import NotFoundPage from './NotFoundPage.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.state = {
      playerId: localStorage.getItem("playerId"),
      authTicket: localStorage.getItem("authTicket")
    };
  }

  onSignIn(playerId, authTicket) {
    localStorage.setItem("playerId", playerId);
    localStorage.setItem("authTicket", authTicket);
    this.setState({ playerId: playerId, authTicket: authTicket });
  }

  onSignOut() {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
      localStorage.removeItem("playerId");
      localStorage.removeItem("authTicket");
      this.setState({ playerId: null, authTicket: null });
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AuthContainer
            signedIn={this.state.playerId && this.state.authTicket}
            onSignIn={this.onSignIn}>
            <Switch>
              <Route exact path="/" render={() => (
                <Redirect to="/lobby/open-games" />
              )} />
              <Route exact path="/lobby" render={() => (
                <Redirect to="/lobby/open-games" />
              )} />
              <Route path="/lobby/:view" render={(props) => (
                <LobbyView {...props}
                  playerId={this.state.playerId}
                  authTicket={this.state.authTicket}
                  onSignOut={this.onSignOut} />
              )} />
              <Route path="/pregame/:id" render={(props) => (
                <PregameView {...props}
                  playerId={this.state.playerId}
                  authTicket={this.state.authTicket} />
              )} />
              <Route path="/game/:id" render={(props) => (
                <TicTacToeGameView {...props}
                  playerId={this.state.playerId}
                  authTicket={this.state.authTicket} />
              )} />
              <Route component={NotFoundPage} />
            </Switch>
          </AuthContainer>
        </div>
      </Router>
    );
  }
}

export default App;
