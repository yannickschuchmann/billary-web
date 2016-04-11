import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';

import * as calls from '../actions/index';

import objectAssign from 'object-assign';

const initialState = {
  projects: [],
  clients: [],
  isFetching: true,
  isFetchingProjects: true,
  isFetchingClients: true,
  isAssigning: false
};

let reducer = createReducer({
  [calls.getClients.request]: (state, payload) => (objectAssign({}, state, {
    isFetchingClients: true,
    isFetching: true
  })),
  [calls.getClients.ok]: (state, payload) => (objectAssign({}, state, {
    clients: payload.body.clients,
    isFetchingClients: false,
    isFetching: state.isFetchingProjects == false ? false : true
  })),
  [calls.getClients.error]: (state, payload) => (objectAssign({}, state, {
    isFetchingClients: false,
    isFetching: state.isFetchingProjects == false ? false : true
  })),
  [calls.getProjects.request]: (state, payload) => (objectAssign({}, state, {
    isFetchingProjects: true,
    isFetching: true
  })),
  [calls.getProjects.ok]: (state, payload) => (objectAssign({}, state, {
    projects: payload.body.projects,
    isFetchingProjects: false,
    isFetching: state.isFetchingClients == false ? false : true
  })),
  [calls.getProjects.error]: (state, payload) => (objectAssign({}, state, {
    isFetchingProjects: false,
    isFetching: state.isFetchingClients == false ? false : true
  })),
  [calls.assignClientToProject.request]: (state, payload) => (objectAssign({}, state, {
    isAssigning: payload.id
  })),
  [calls.assignClientToProject.ok]: (state, payload) => (objectAssign({}, state, {
    isAssigning: false
  })),
  [calls.assignClientToProject.error]: (state, payload) => (objectAssign({}, state, {
    isAssigning: false
  }))
}, initialState);

export default reducer;
