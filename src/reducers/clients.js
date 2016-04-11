import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';

import * as calls from '../actions/index';

import objectAssign from 'object-assign';

const initialState = {
  data: [],
  isFetching: true
};

let reducer = createReducer({
  [calls.getClients.request]: (state, payload) => (objectAssign({}, state, {
    isFetching: true
  })),
  [calls.getClients.ok]: (state, payload) => (objectAssign({}, state, {
    data: payload.body.clients,
    isFetching: false
  })),
  [calls.getClients.error]: (state, payload) => (objectAssign({}, state, {
    isFetching: false
  }))
}, initialState);

export default reducer;
