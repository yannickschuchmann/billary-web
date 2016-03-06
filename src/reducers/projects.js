import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';

import * as calls from '../actions';

import objectAssign from 'object-assign';

const initialState = {
  selectedProject: 9,
  projects: []
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.

let reducer = createReducer({
  // GET_PROJECTS
  [calls.getProjects.request]: (state, payload) => {
    return state;
  },
  [calls.getProjects.ok]: (state, payload) => {
    let newState = objectAssign({}, state);
    newState.projects = payload.body.projects;
    return newState;
  },
  [calls.getProjects.error]: (state, payload) => {
    return state;
  },

  // POST_PROJECT
  [calls.postProject.request]: (state, payload) => {
    return state;
  },
  [calls.postProject.ok]: (state, payload) => {
    let newState = objectAssign({}, state);
    // newState.projects = payload.body.projects;
    return newState;
  },
  [calls.postProject.error]: (state, payload) => {
    return state;
  },


  // POST_PROJECT
  [calls.deleteProject.request]: (state, payload) => {
    return state;
  },
  [calls.deleteProject.ok]: (state, payload) => {
    let newState = objectAssign({}, state);
    // newState.projects = payload.body.projects;
    return newState;
  },
  [calls.deleteProject.error]: (state, payload) => {
    return state;
  }
}, initialState);

export default reducer;
