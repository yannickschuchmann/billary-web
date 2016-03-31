import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';

import * as calls from '../../actions/auth';

import objectAssign from 'object-assign';
import deepAssign from 'updeep';

const initialState = {
  attributes: {},
  isSignedIn: false
};

const setUser = (state, payload) => {
  return objectAssign({}, state, {
    attributes: payload,
    isSignedIn: true
  })
};

let reducer = createReducer({
  [calls.authenticate.ok]: setUser,
  [calls.emailSignIn.ok]: setUser,
  [calls.configure.ok]: setUser,

  [calls.configure.ok]: (state, payload) => {
    if (payload.reason) {
      return initialState;
    } else {
      return setUser(state, payload);
    }
  },

  [calls.signOut.request]: (state, payload) => initialState,
  [calls.signOut.ok]: (state, payload) => initialState

}, initialState);

export default reducer;
