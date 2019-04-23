import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export namespace FormDialog{
    export interface Props{
        close: () => void;
        submit: () =>void;
        show: boolean;
    }
}
export default class FormDialog extends React.Component<FormDialog.Props> {

  handleClose = () => {
    const{close} = this.props;
    close&&this.props.close();
  };
  handleSubmit = () => {
    const{submit} = this.props;
    submit&&this.props.submit();
  };
  render() {
    return (
      <div>
        <Dialog
          open={this.props.show}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add new appointment
            </DialogContentText>
            {this.props.children}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}