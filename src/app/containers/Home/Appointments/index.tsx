import * as React from 'react';
import { WithStyles} from '@material-ui/core/styles';
import CardList from 'app/components/CardsList';
import { connect } from 'react-redux';
import { getAppointment, deleteAppointment} from 'app/ducks/appointment';
// import Typography from '@material-ui/core/Typography';
// import DefaultImage from 'app/img/icons8-services-64.png';
// import AgendaAdd from 'app/img/agenda-add.png';
// import Calendar from 'app/img/calendar.png';
// import Money from 'app/img/money.png';
// import Services from 'app/containers/Services';
// import { Ticket } from 'app/containers/Services/ticket';

// const styles = (theme:any )=>({
//   root: {
//     flexGrow: 1,
//     padding: 24
//   },
//   fab: {
//     margin: theme.spacing.unit,
//   },
//   welcome: {
//     padding: 24,
//     backgroundColor: theme.palette.background.hover,
//     marginBottom: 24
//   },
//   list: {
//     color: theme.palette.text.secondary,
//     display: 'flex' as 'flex',
//     flex: '1 1 auto'
//   },
//   item: {
//     textDecoration: 'none',
//     borderRadius: 5,
//     cursor: 'pointer',
//     margin: 12,
//     minWidth: 120,
//     textAlign: 'center',
//     '&:hover': {
//       backgroundColor: theme.palette.background.hover
//     }
//   }
// });

export namespace Appointments {
  export interface Props extends WithStyles{
    profile?: any;
    appointment: any;
    loading: boolean;
    error?: Error;
    deleteAppointment: (id: string) => void;
  }
}

export class Appointments extends React.Component<Appointments.Props> {
    state = {
      modal: false,
    }

    handleDelete = (id: string) =>{
      console.log(id);
      this.props.deleteAppointment(id);
    }

    render() {
       const {appointment, loading} = this.props;
       console.log(appointment.toJS(), loading);
       const list = appointment.toJS();
      return (    
         <CardList items={list} onDelete={(id) => this.handleDelete(id)} />
      );
    }
  }
export default connect(
    getAppointment,
    (dispatch)=>({
      deleteAppointment: (id: string) => dispatch(deleteAppointment(id))
    })
)<any>(Appointments);
