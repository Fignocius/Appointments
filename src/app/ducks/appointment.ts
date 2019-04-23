import createReducer from 'app/util/createReducer';
import {createSelector} from 'reselect';
import Immutable from 'immutable';
import api from 'app/ducks/api';

export enum ActionTypes {
  LoadStart = 'appointment.LoadStart',
  LoadError = 'appointment.LoadError',
  LoadSuccess = 'appointment.LoadSuccess',
}

export type Appointment = {
  id: string;
  date: string | Date;
  name: string;
  hour: string;
  description: string;
};

// Reducers
export const initialState = Immutable.fromJS({
  appointment: [{
    id: '1',
    date: '2019-04-04',
    hour: '12:30',
    name: 'Teste',
    description: 'his source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree. Immutable data encourages pure functions (data-in, data-out) and lends itself to much simpler application development and enabling techniques from functional programming such as lazy evaluation.'
  },
  {
    id: '2',
    date: '2019-04-04',
    hour: '12:30',
    name: 'Teste 2',
    description: 'his source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree. Immutable data encourages pure functions (data-in, data-out) and lends itself to much simpler application development and enabling techniques from functional programming such as lazy evaluation.'
  }] as Array<Appointment>,
  error: undefined,
  loading: false,
});

export const Reducer = createReducer(initialState, {
  [ActionTypes.LoadStart](state) {
    state = state.setIn(['loading'], true);
    return state;
  },
  [ActionTypes.LoadSuccess](state, action) {
    state = state.setIn(['loading'], false);
    console.log(action.payload);
    state = state.setIn(['appointment'], Immutable.List(action.payload));
    return state;
  },
  [ActionTypes.LoadError](state, action) {
    state = state.setIn(['loading'], false);
    state = state.setIn(['error'], Immutable.Map(action.payload.error));
    return state;
  }
});

export type Actions = {
  LoadStart: { type: ActionTypes.LoadStart; payload: any };
  LoadSuccess: {
    type: ActionTypes.LoadSuccess;
    payload: any;
  };
  LoadError: {
    type: ActionTypes.LoadError;
    payload: Error;
  };
};


// Selectors
const mainSelector = (state: any) => state.appointment;
export const getAppointment = createSelector(
  [mainSelector],
  (state)=>({
   appointment: state.getIn(['appointment'], Immutable.List([{}])),
   error: state.getIn(['error'], Immutable.Map({})),
   loading: state.getIn(['loading'], false)
  })
);



// Actions
export function fetchStates() {
  return (dispatch) => {
    api(dispatch)
      .form(fetchStates.name)
      .reset()
      .get(undefined, `${process.env.BASE_PATCH}/locations/states`, undefined)
      .then(json => {
        dispatch({ type:ActionTypes.LoadSuccess, payload: json });
      })
      .catch((e) => {
        dispatch({
          type: ActionTypes.LoadError,
          payload:  e.response.data.error,
        } as Actions['LoadError']);
      });
  };
}

export function createAppointment(values: Appointment) {
  return (dispatch, getState) => {
    console.log(getState().appointment.getIn(['appointment'], Immutable.List([{}])).toJS(), values);
    const list =  getState().appointment.getIn(['appointment'], Immutable.List([{}])).toJS();
    list.push({...values})
    dispatch({ type:ActionTypes.LoadSuccess, payload: list })
    // api(dispatch)
    //   .form(createAppointment.name)
    //   .reset()
    //   .post(undefined,`${process.env.BASE_PATCH}/locations/states`, undefined, undefined)
    //   .then(json => {
    //     dispatch({ type:ActionTypes.LoadSuccess, payload: json });
    //   })
    //   .catch((e) => {
    //     dispatch({
    //       type: ActionTypes.LoadError,
    //       payload:  e.response.data.error,
    //     } as Actions['LoadError']);
    //   });
  };
}
export function deleteAppointment(id: string) {
  return (dispatch, getState) => {
    console.log(getState().appointment.getIn(['appointment'], Immutable.List([{}])).toJS(), id);
    const list =  getState().appointment.getIn(['appointment'], Immutable.List([{}])).toJS();
    let filter: Array<Appointment> = 
    list.filter((item) => {return item.id !== id});
    dispatch({ type:ActionTypes.LoadSuccess, payload: filter })
    // api(dispatch)
    //   .form(createAppointment.name)
    //   .reset()
    //   .post(undefined,`${process.env.BASE_PATCH}/locations/states`, undefined, undefined)
    //   .then(json => {
    //     dispatch({ type:ActionTypes.LoadSuccess, payload: json });
    //   })
    //   .catch((e) => {
    //     dispatch({
    //       type: ActionTypes.LoadError,
    //       payload:  e.response.data.error,
    //     } as Actions['LoadError']);
    //   });
  };
}