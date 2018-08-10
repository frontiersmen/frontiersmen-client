import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class ConnectionErrorDialog extends Component {
  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>Connection error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Error connecting to server. Please refresh.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => window.location.reload()} color="primary">
            Refresh
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
