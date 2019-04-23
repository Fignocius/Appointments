import { combineReducers, Reducer } from 'redux';
import { RootState } from 'app/reducers/state';
import { apiReducer } from 'app/ducks/api';
import { routerReducer, RouterState } from 'react-router-redux';
import { Reducer as appointmentReducer } from 'app/ducks/appointment';
export { RootState, RouterState };

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  requests: apiReducer,
  router: routerReducer,
  appointment: appointmentReducer
});
