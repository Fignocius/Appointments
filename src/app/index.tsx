import * as React from 'react';
import { Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Loadable from 'react-loadable';
import Loader from 'app/components/PageLoader';

// const SecureContainer = Loadable({
//   loader: () => import('app/containers/Auth/SecureContainer'),
//   loading() {
//     return <Loader />;
//   },
// });

const ConnectedApp = Loadable({
  loader: () => import('app/containers/App'),
  loading() {
    return <Loader />;
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5a91e0',
      main: '#1664ae',
      dark: '#003b7e',
    },
    secondary: {
      light: '#fff054',
      main: '#fabe13',
      dark: '#c28e00',
    },
    background: {
      hover: '#f1f1f1',
    },
  },
} as any);

export const App = hot(module)(() => (
  <MuiThemeProvider theme={theme}>
    <Switch>

      <Route path="/" component={ConnectedApp} />

      {/* <SecureContainer>
        <Route path="/" component={ConnectedApp} />
      </SecureContainer> */}
    </Switch>
  </MuiThemeProvider>
));
