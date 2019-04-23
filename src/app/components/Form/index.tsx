import * as React from 'react';
import { createForm, formShape } from 'rc-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import uuidv4 from 'uuid/v4';
import { format } from 'app/util';

import * as Moment from 'moment';
Moment.locale('pt-br');


export namespace Form{
    export interface Props{
        initialData: any;
        onClose: () => void;
        onSubmit: (err: any, values: any) =>void;
        show: boolean;
    }
}
export class Form extends React.Component<formShape>{
    handleClose = () => {
        const{onClose} = this.props;
        onClose&&this.props.onClose();
      };

    handleSubmit = () => {
        this.props.form.validateFields((error, values) => {
            this.props.onSubmit(error, {id: uuidv4(), ...values});
          });
      };

    render(){
        const {getFieldDecorator, getFieldError} = this.props.form;
        const {initialData} = this.props;
        return(
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
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0px 20px 30px 20px'}}>
              
              {getFieldDecorator('name', {
                    rules: [{ type: 'string', required: true }],
                    initialValue: Moment(initialData).format(format.EXTPTBR)
                })(
                    <TextField
                    InputProps={{ color: '#006D5D' }}
                    fullWidth
                    error = {Boolean(getFieldError('name'))}
                    label={'Title'}
                    margin="normal"
                    style={{ marginRight: 10, color: '#006D5D' }}
                    />
                )}
                {getFieldDecorator('date', {
                        rules: [{ type: 'string', required: true }],
                        initialValue: Moment(initialData).format("YYYY-MM-DD")
                    })(
                        <TextField
                        InputProps={{ color: '#006D5D' }}
                        fullWidth
                        error = {Boolean(getFieldError('date'))}
                        label={'Date'}
                        type= 'date'
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ marginRight: 10, color: '#006D5D' }}
                        />
                    )}
                {getFieldDecorator('hour', {
                        rules: [{ type: 'string', required: true }],
                        initialValue: Moment().format('hh:mm')
                    })(
                        <TextField
                        InputProps={{ color: '#006D5D' }}
                        fullWidth
                        error = {Boolean(getFieldError('hour'))}
                        label={'Hour'} 
                        value= {2018}
                        type= 'time'
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{ marginRight: 10, color: '#006D5D' }}
                        />
                    )}
                {getFieldDecorator('description', {
                    rules: [{ type: 'string', required: true }],
                })(
                    <TextField
                    InputProps={{ color: '#006D5D' }}
                    fullWidth
                    multiline
                    rowsMax="10"     
                    error = {Boolean(getFieldError('description'))}
                    label={'Description'}
                    margin="normal"
                    style={{ marginRight: 10, color: '#006D5D' }}
                    />
                )}
            </div>
            </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        );
    }
}
export default createForm()(Form);
