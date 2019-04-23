import * as React from 'react';
import {connect} from 'react-redux';
import Form from 'app/components/Form';
// import { format } from 'app/util';
import {createAppointment, Appointment} from 'app/ducks/appointment';
import * as Moment from 'moment';
Moment.locale('pt-br');


export namespace Create{
    export interface Props{
        initialData: any;
        show: boolean;
        createAppointment: (value: Appointment) => Promise<void>;
        onClose: () => void;
    }
}
export class Create extends React.Component<Create.Props>{
    handleClose = () => {
        const{onClose} = this.props;
        onClose&&this.props.onClose();
      };

    handleSubmit = (err, values) => {
        if (!err){
            this.props.createAppointment(values);
            this.props.onClose();
        }
      };

    render(){
        const {initialData, show} = this.props;
        return(
            <Form
             initialData={initialData}
             show={show}
             onClose={this.handleClose}
             onSubmit={(err, values) => this.handleSubmit(err, values)}
             />
        );
    }
}
export default connect(
()=>{},
(dispatch) =>({
createAppointment: (value: Appointment) => dispatch(createAppointment(value)),
})
)(Create) as any;
