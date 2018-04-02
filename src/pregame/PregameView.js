import React, { Component } from 'react';
import PregameConnection from './pregameConnection.js';

export default class PregameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pregameConnection: null,
      pregame: null
    };
  }

  componentWillMount() {
    var pregameConnection = new PregameConnection(this.props.match.params.id, this.props.playerId, this.props.authToken);
    pregameConnection.on("PregameUpdateEvent", event => {
      this.setState({ pregame: event.pregame });
    });
    this.setState({ pregameConnection: pregameConnection });
  }

  componentWillUnmount() {
    this.state.pregameConnection.disconnect();
  }

  render() {
    var pregame = this.state.pregame;
    if (pregame) {
      return (
        <div>
          <p>#{pregame.gameId}</p>
          <p>{pregame.name}</p>
          <p>Created by {pregame.creator.name}</p>
          <button onClick={this.state.pregameConnection.startGame}>Start</button>
        </div>
      );
    } else {
      return <div>Loading...</div>
    }
  }
}
