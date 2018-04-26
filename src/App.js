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
import GameView from './game/GameView.js';
import NotFoundPage from './NotFoundPage.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
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

  render() {
    return (
      <Router>
        <div className="App">
          <AuthContainer signedIn={this.state.playerId && this.state.authTicket} onSignIn={this.onSignIn}>
            <Switch>
              <Route exact path="/" render={() => (
                <Redirect to="/lobby/open-games" />
              )} />
              <Route exact path="/lobby" render={() => (
                <Redirect to="/lobby/open-games" />
              )} />
              <Route path="/lobby/:view" render={(props) => (
                <LobbyView {...props} playerId={this.state.playerId} authTicket={this.state.authTicket} />
              )} />
              <Route path="/pregame/:id" render={(props) => (
                <PregameView {...props} playerId={this.state.playerId} authTicket={this.state.authTicket} />
              )} />
              <Route path="/game/:id" render={(props) => (
                <GameView {...props} playerId={this.state.playerId} authTicket={this.state.authTicket} />
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
