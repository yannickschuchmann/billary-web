import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';

import * as calls from '../actions';

import objectAssign from 'object-assign';

const initialState = {
    projects: []
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.

let reducer = createReducer({
  [calls.getProjects]: (state, payload) => {
    return state;
  },
  [calls.getProjects.ok]: (state, payload) => {
    console.log('login.ok ', payload);
    let newState = objectAssign({}, state);
    newState.projects = payload.body.projects;
    return newState;
  },
  [calls.getProjects.error]: (state, payload) => {
    console.log('login.error ', payload);
    return state;
  }
}, initialState);

export default reducer;
