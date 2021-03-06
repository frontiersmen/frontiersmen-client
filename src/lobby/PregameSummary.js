import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = {
  row: {
    cursor: 'pointer'
  }
};

class PregameSummary extends Component {
  playersOnline(playerSeats) {
    return playerSeats
      .filter(player => player)
      .length;
  }

  joinGame = () => {
    this.props.history.push(`/pregame/${this.props.pregame.gameId}`);
  }

  render() {
    return (
      <TableRow hover className={this.props.classes.row} onClick={this.joinGame}>
        <TableCell>{this.props.pregame.name}</TableCell>
        <TableCell>
          {this.playersOnline(this.props.pregame.playerSeats)}/{this.props.pregame.maximumPlayers}
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(withRouter(PregameSummary));
