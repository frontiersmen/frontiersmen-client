import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


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
