import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, RouteComponentProps } from 'react-router';
import Header from 'app/containers/Header';
import Divider from '@material-ui/core/Divider';
import Loader from 'app/components/PageLoader';

import Loadable from 'react-loadable';


const Home = Loadable({
  loader: () => import('app/containers/Home'),
  loading() {
    return <Loader />;
  }
});

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    fetchLoggedIn: any;
  }
}


export class App extends React.PureComponent<App.Props> {
  componentDidMount() {
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          maxWidth: 375
        }}>
          <Switch>
            <Route path="*" component={Header} />
          </Switch>
          <Divider />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({})
)(App);
