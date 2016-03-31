import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';

import * as calls from '../../actions/auth';

import objectAssign from 'object-assign';
import deepAssign from 'updeep';

const initialState = {
  isFetching: true
};

let reducer = createReducer({

  [calls.authenticate.request]: (state, payload) => {
    return objectAssign({}, state, {
      isFetching: true
    })
  },
  [calls.authenticate.ok]: (state, payload) => {
    return objectAssign({}, state, {
      isFetching: false
    })
  },
  [calls.authenticate.error]: (state, payload) => {
    return objectAssign({}, state, {
      isFetching: false
    })
  }
}, initialState);

export default reducer;
