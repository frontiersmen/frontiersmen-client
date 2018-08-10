import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ChangeDisplayNameDialog extends Component {
  handleClose = () => {
    this.props.onClose();
  }

  handleSubmit = () => {
    this.props.onSubmit(this.input.value);
    this.handleClose();
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change display name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            defaultValue={this.props.currentName}
            margin="dense"
            id="name"
            label="Display Name"
            fullWidth
            inputRef={(input) => this.input = input} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
