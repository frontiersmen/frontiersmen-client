import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Flag from 'material-ui-icons/Flag';

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
            <Flag />
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
