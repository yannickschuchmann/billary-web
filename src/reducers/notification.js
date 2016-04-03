import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';

import * as calls from '../actions';
import * as authCalls from '../actions/auth';

import objectAssign from 'object-assign';

const initialState = {
  snackbar: "",
  snackbarOpen: false
};

const notify = (msg, state) => objectAssign({}, state, {
  snackbar: msg,
  snackbarOpen: true
});

let reducer = createReducer({
  [authCalls.signOut.ok]: (state, payload) => notify("successfully logged out", state),
  [authCalls.emailSignIn.error]: (state, payload) => notify(payload.reason, state),
  [authCalls.emailSignUp.error]: (state, payload) => notify(payload.reason, state),
  [authCalls.emailSignUp.ok]: (state, payload) => notify("Check your mails.", state),
  [authCalls.emailSignIn.ok]: (state, payload) => notify(`Hello ${payload.data.email}`, state),
  [calls.hideSnackbar]: (state, payload) => (initialState)
}, initialState);

export default reducer;
