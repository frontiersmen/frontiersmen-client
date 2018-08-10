import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import FlagIcon from '@material-ui/icons/Flag';

export default class Seat extends Component {
  constructor(props) {
    super(props);
    this.leaveSeat = this.leaveSeat.bind(this);
    this.takeSeat = this.takeSeat.bind(this);
  }

  leaveSeat(e) {
    this.props.onLeave(this.props.seat);
  }

  takeSeat(e) {
    this.props.onTake(this.props.seat);
  }

  renderButton() {
    if (this.props.occupant) {
      if (this.props.occupant.id === this.props.playerId) {
        return (
          <Button color="primary" variant="raised" onClick={this.leaveSeat}>
            Leave
          </Button>
        );
      } else {
        return null;
      }
    } else {
      return (
        <Button color="primary" variant="raised" onClick={this.takeSeat}>
          Join
        </Button>
      );
    }
  }

  render() {
    return (
      <ListItem>
        <ListItemIcon>
          <Avatar>
            <FlagIcon />
          </Avatar>
        </ListItemIcon>
        {this.props.occupant && <ListItemText primary={this.props.occupant.name} />}
        <ListItemSecondaryAction>
          {this.renderButton()}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
