import * as React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

export namespace Header {
  export interface Props {
    logo: any;
    menuContent: any;
    profile: any;
    name: string;
    classes?: any;
  }
}
 
const styles = {
  root: {
    flexGrow: 1,
    zIndex: 1204
  },
  flex: {
    display: 'flex',
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};
export class Header extends React.Component<Header.Props & WithStyles> {
    state = {
      anchorEl: undefined,
      menuShow: false,
      open: false
    };

    handleChange = (event: any, checked: any) => {
      this.setState({ auth: checked });
    };

    handleMenu = (event: any) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    handleMenuToggle = () => {
      this.setState({ menuShow: !this.state.menuShow });
    };

    render() {
      const { classes, menuContent, profile, children } = this.props;
      const { menuShow } = this.state;

      return (
        <div className={classes.root}>
          <AppBar position="static" style={{ zIndex: 12012 }}>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.handleMenuToggle}
              >
                <MenuIcon />
              </IconButton>
              <div style={{display: 'flex',  flex: 1, flexDirection:'row', justifyContent:'space-between'}}>
                <div style={{display:'flex'}}>{profile}</div>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <Typography variant="display3" style={{color:'#fff'}} gutterBottom align="center">
                      Calendar
                    </Typography>
                  </div>
                <div>{children}</div>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer open={menuShow} onClose={this.handleMenuToggle} onClick={this.handleMenuToggle}>
            {menuContent}
          </Drawer>
        </div>
      );
    }
  }
export default withStyles(styles)<any>(Header);