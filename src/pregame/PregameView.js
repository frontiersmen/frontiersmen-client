import React, { Component } from 'react';
import PregameConnection from './pregameConnection.js';
import Seat from './Seat.js';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';

export default class PregameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pregameConnection: null,
      pregame: null
    };
    this.takeSeat = this.takeSeat.bind(this);
    this.leaveSeat = this.leaveSeat.bind(this);
  }

  componentWillMount() {
    var pregameConnection = new PregameConnection(this.props.match.params.id, this.props.playerId, this.props.authToken);
    pregameConnection.on("PregameUpdateEvent", event => {
      this.setState({ pregame: event.pregame });
    });
    pregameConnection.on("TransitionToGameEvent", event => {
      this.props.history.push(`/game/${this.state.pregame.gameId}`);
    });
    this.setState({ pregameConnection: pregameConnection });
  }

  componentWillUnmount() {
    this.state.pregameConnection.disconnect();
  }

  takeSeat(seat) {
    this.state.pregameConnection.takeSeat(seat);
  }

  leaveSeat(seat) {
    this.state.pregameConnection.leaveSeat(seat);
  }

  canStart() {
    var pregame = this.state.pregame;
    return pregame.creator.id === this.props.playerId && pregame.playerSeats.filter(p => p).length >= pregame.minimumPlayers;
  }

  render() {
    var pregame = this.state.pregame;
    if (pregame) {
      return (
        <div>
          <p>#{pregame.gameId}</p>
          <p>{pregame.name}</p>
          <p>Created by {pregame.creator.name}</p>
          <Paper>
            <List>
              {pregame.playerSeats.map((occupant, seat) =>
                <Seat
                  key={seat}
                  onTake={this.takeSeat}
                  onLeave={this.leaveSeat}
                  occupant={occupant}
                  seat={seat}
                  playerId={this.props.playerId} />
              )}
            </List>
          </Paper>
          <Button
            disabled={!this.canStart()}
            onClick={this.state.pregameConnection.startGame}
            variant="raised">
            Start
          </Button>
        </div>
      );
    } else {
      return <div>Loading...</div>
    }
  }
}
