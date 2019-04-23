import * as React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


export namespace Header {
  export interface Props extends RouteComponentProps<void> {
    profile?: any;
    classes?: any;
  }
  export interface State { }
}

const styles = (theme: any) => ({
  root: {
    flexGrow: 0
  },
  container: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    }
  },
  header:{
    width: '100%',
    alignSelf: 'center',
    color: '#fff'
  }
});

export class Header extends React.Component<Header.Props & WithStyles<'root' | 'header'>> {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ zIndex: 12012 }}>
            <Toolbar>
                    <Typography variant="display1" className={classes.header} gutterBottom align="center">
                      Calendar
                    </Typography>
              </Toolbar>
          </AppBar>
      </div>
    );
  }
}
export default withStyles(styles as any)(Header);
