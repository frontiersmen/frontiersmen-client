import React, { Component } from 'react';
import GameConnection from '../game/gameConnection.js';
import ConnectionErrorDialog from '../ConnectionErrorDialog.js';
import TicTacToeBoard from './TicTacToeBoard.js';

export default class TicTacToeGameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameConnection: null,
      game: null,
      connectionErrored: false
    };
  }

  componentWillMount() {
    var gameConnection = new GameConnection(this.props.match.params.id, this.props.playerId, this.props.authTicket, this.openConnectionErrorDialog);
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
            <TicTacToeBoard board={this.state.game.board.spaces} onPlaceMark={this.state.gameConnection.placeMark}/>
            {this.state.game.isOver && (
              this.state.game.victor ? (
                this.state.game.victor.name + " has won"
              ) : (
                "Stalemate"
              )
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <ConnectionErrorDialog open={this.state.connectionErrored} />
      </div>
    );
  }
}
