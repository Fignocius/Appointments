import fetch from 'isomorphic-fetch';
import Immutable from 'immutable';
import createReducer from 'app/util/createReducer';
import { createSelector } from 'reselect';

const CancelFormTracker = { default: false };

// action types for api
export const ActionTypes = {
  PreFetch: 'API_PreFetch',
  SuccessFetch: 'API_SuccessFetch',
  FailFetch: 'API_FailFetch',
  CancelFetch: 'API_CancelFetch',
  Reset: 'API_Reset'
};

// action creators
export function preFetch(form, data, time) {
  return {
    type: ActionTypes.PreFetch,
    payload: { form, data, time }
  };
}

export function reset(form) {
  return {
    type: ActionTypes.Reset,
    payload: { form }
  };
}

export function successFetch(form, json, time) {
  return {
    type: ActionTypes.SuccessFetch,
    payload: { form, json, time }
  };
}

export function failFetch(form, status, json) {
  return {
    type: ActionTypes.FailFetch,
    payload: { form, status, json }
  };
}

export function cancelFetch(form) {
  CancelFormTracker[form] = true;
  return {
    type: ActionTypes.CancelFetch,
    payload: { form }
  };
}

// reducer for api
const initialState = Immutable.fromJS({
  default: {
    loading: false,
    contents: null,
    updatedAt: 0,
    failure: false
  }
});

export let apiReducer = createReducer(initialState, {
  [ActionTypes.Reset](state, action) {
    state = state.setIn([action.payload.form, 'loading'], false);
    state = state.setIn([action.payload.form, 'contents'], null);
    state = state.setIn([action.payload.form, 'updatedAt'], 0);
    state = state.setIn([action.payload.form, 'failure'], 0);
    return state;
  },
  [ActionTypes.PreFetch](state, action) {
    state = state.setIn([action.payload.form, 'loading'], true);
    return state;
  },
  [ActionTypes.SuccessFetch](state, action) {
    state = state.setIn([action.payload.form, 'contents'], Immutable.fromJS(action.payload.json));
    state = state.setIn([action.payload.form, 'updatedAt'], action.payload.time);
    state = state.setIn([action.payload.form, 'loading'], false);
    state = state.setIn([action.payload.form, 'failure'], false);
    return state;
  },
  [ActionTypes.FailFetch](state, action) {
    state = state.setIn([action.payload.form, 'contents'], Immutable.fromJS(action.payload.json));
    state = state.setIn([action.payload.form, 'updatedAt'], 0);
    state = state.setIn([action.payload.form, 'loading'], false);
    state = state.setIn([action.payload.form, 'failure'], true);
    return state;
  },
  [ActionTypes.CancelFetch](state, action) {
    state = state.setIn([action.payload.form, 'contents'], null);
    state = state.setIn([action.payload.form, 'updatedAt'], 0);
    state = state.setIn([action.payload.form, 'loading'], false);
    state = state.setIn([action.payload.form, 'failure'], false);
    return state;
  }
});

// selectors for api
const requestsSelector = (state) => state.requests;

export let apiSelector = (form) => {
  let fName = form;
  if (Array.isArray(form)) {
    fName = form.join('_');
  }
  return createSelector(requestsSelector, (state) => state.get(fName, Immutable.Map({})));
};

// api class definition
class API {
  dispatch: any = () => {};
  form = 'default';
  data = {};
  resetData = false;
  defaultOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  constructor(dispatch, form) {
    this.dispatch = dispatch;
    this.form = form;
  }

  reset() {
    this.resetData = true;
    return this;
  }

  _bakedFetch(...args) {
    if (this.resetData) this.dispatch(reset(this.form));
    this.dispatch(preFetch(this.form, this.data, Date.now()));
    CancelFormTracker[this.form] = false;
    return new Promise((resolve, reject) => {
      return fetch
        .apply(this, args)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json().then((json) => {
              this.dispatch(successFetch(this.form, json, Date.now()));
              if (!CancelFormTracker[this.form]) resolve(json);
            });
          }
          return response.json().then((json) => {
            this.dispatch(failFetch(this.form, response.status, json));
            if (!CancelFormTracker[this.form]) reject({ status: response.status, json: json });
          });
        })
        .catch((s) => {
          this.dispatch(failFetch(this.form, s, {}));
          return reject({ status: s, json: {} });
        });
    });
  }

  get(token, url, options) {
    let getOptions = {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: token
      }
    };
    this.data = {};
    return this._bakedFetch(url, { ...this.defaultOptions, ...getOptions, ...options });
  }

  post(token, url, data, options) {
    let getOptions = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(data)
    };
    this.data = data;
    return this._bakedFetch(url, { ...this.defaultOptions, ...getOptions, ...options });
  }

  del(token, url, options) {
    let getOptions = {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        Authorization: token
      }
    };
    this.data = {};
    return this._bakedFetch(url, { ...this.defaultOptions, ...getOptions, ...options });
  }

  put(token, url, data, options) {
    let getOptions = {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(data)
    };
    this.data = data;
    return this._bakedFetch(url, { ...this.defaultOptions, ...getOptions, ...options });
  }
}

export default function api(dispatch) {
  return {
    form: (form) => new API(dispatch, form)
  };
}
