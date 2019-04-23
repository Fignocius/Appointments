import React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

export namespace PageLoader {
  export interface Props {
    classes: any;
  }
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    alignContents: 'center' as 'center'
  },
  loader: {
    flex: '0 1 auto',
    alignSelf: 'center' as 'center'
  }
});

class PageLoader extends React.PureComponent<PageLoader.Props & WithStyles<'root' | 'loader'>> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CircularProgress className={classes.loader} />
      </div>
    );
  }
}

export default withStyles(styles)<any>(PageLoader);
