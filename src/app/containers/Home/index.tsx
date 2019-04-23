import * as React from 'react';
import { withStyles, WithStyles} from '@material-ui/core/styles';
import Calendar from 'react-calendar';
require("react-calendar/dist/Calendar");
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Appointments from './Appointments';
import Create from './Create';

import * as Moment from 'moment';
Moment.locale('pt-br');

// import Typography from '@material-ui/core/Typography';
// import DefaultImage from 'app/img/icons8-services-64.png';
// import AgendaAdd from 'app/img/agenda-add.png';
// import Calendar from 'app/img/calendar.png';
// import Money from 'app/img/money.png';
// import Services from 'app/containers/Services';
// import { Ticket } from 'app/containers/Services/ticket';

const styles = (theme:any )=>({
  root: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#efefef',
  },
  fab: {
    margin: theme.spacing.unit,
  },
  welcome: {
    padding: 24,
    backgroundColor: theme.palette.background.hover,
    marginBottom: 24
  },
  list: {
    color: theme.palette.text.secondary,
    display: 'flex' as 'flex',
    flex: '1 1 auto'
  },
  item: {
    textDecoration: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    margin: 12,
    minWidth: 120,
    textAlign: 'center',
    '&:hover': {
      backgroundColor: theme.palette.background.hover
    }
  }
});

export namespace Home {
  export interface Props {
    profile?: any;
  }
}

export class Home extends React.Component<Home.Props & WithStyles> {
    state = {
      modal: false,
      date: new Date(),
    }
    render() {
       const {classes} = this.props;
      return (
          <div className={classes.root}>
            <Calendar value={this.state.date} onChange={(date) => { this.setState({ date: date}) }} />
            <Grid container justify='flex-end'>
            <Fab color="primary" aria-label="Add" style={{alignSelf: "flex-end"}} onClick={() => this.setState({modal: true})} >
              <AddIcon />
            </Fab>
            </Grid>
            <Grid container direction='column' spacing={16} justify='flex-start' alignItems='center'>
                <Appointments />
            </Grid>
            <Create initialData={this.state.date} show={this.state.modal} onClose={()=>this.setState({modal: false})} />
           </div>
      );
    }
  }
export default withStyles(styles as any)(Home);
