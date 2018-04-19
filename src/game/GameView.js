import React, { Component } from 'react';
import GameConnection from './gameConnection.js';
import ConnectionErrorDialog from '../ConnectionErrorDialog.js';

export default class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameConnection: null,
      game: null,
      connectionErrored: false
    };
  }

  componentWillMount() {
    var gameConnection = new GameConnection(this.props.match.params.id, this.props.playerId, this.props.authToken, this.openConnectionErrorDialog);
    gameConnection.on("GameUpdateEvent", event => {
      this.setState({ game: event.game });
    });
    this.setState({ gameConnection: gameConnection });
  }

  componentWillUnmount() {
    this.state.gameConnection.disconnect();
  }

  openConnectionErrorDialog = () => {
    console.log("foo");
    this.setState({ connectionErrored: true });
  }

  render() {
    return (
      <div>
        {this.state.game ? (
          <div>
            <p>#{this.state.game.id}</p>
            <p>{this.state.game.name}</p>
            <p>Created by {this.state.game.creator.name}</p>
            {this.state.game.pregame ? <button onClick={this.state.gameConnection.startGame}>Start</button> : null}
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <ConnectionErrorDialog open={this.state.connectionErrored} />
      </div>
    );
  }
}
