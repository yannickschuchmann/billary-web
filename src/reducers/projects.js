import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';

import * as calls from '../actions';

import objectAssign from 'object-assign';

const initialState = {
  selectedId: 15,
  isLoading: false,
  items: [],
  openedItems: [1]
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.

const setOpenedToChildren = (item, openedItems) => {
  item.opened = _.indexOf(openedItems, item.id) != -1;
  item.children = item.children.map((item, i) => {
    return setOpenedToChildren(item, openedItems);
  });
  return item;
}

let reducer = createReducer({

  // GET_PROJECTS
  [calls.getProjects.request]: (state, payload) => {
    return objectAssign({}, state, {
      isLoading: true
    });
  },
  [calls.getProjects.ok]: (state, payload) => {
    const items = payload.body.projects.map((item, i) => {
      return setOpenedToChildren(item, state.openedItems);
    });
    return objectAssign({}, state, {
      isLoading: false,
      items: items
    });
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
    return newState;
  },
  [calls.postProject.error]: (state, payload) => {
    return state;
  },


  // DELETE_PROJECT
  [calls.deleteProject.request]: (state, payload) => {
    return state;
  },
  [calls.deleteProject.ok]: (state, payload) => {
    let newState = objectAssign({}, state);
    return newState;
  },
  [calls.deleteProject.error]: (state, payload) => {
    return state;
  },


  // OPEN_PROJECT
  [calls.openProject]: (state, payload) => {
    let openedItems = [...state.openedItems];
    if (_.indexOf(state.openedItems, payload.id) == -1) {
      // open
      openedItems.push(payload.id);
    } else {
      // close
      openedItems = _.without(openedItems, payload.id);
    }

    const items = state.items.map((item, i) => {
      return setOpenedToChildren(item, openedItems);
    });

    return objectAssign({}, state, {
      openedItems: openedItems,
      items: items
    });
  }

}, initialState);

export default reducer;
