import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';
import {unflattenEntities} from '../businessLogic/treeHelper';

import * as calls from '../actions';

import objectAssign from 'object-assign';

const initialState = {
  selectedId: 15,
  isLoading: false,
  items: [],
  tree: [],
  unfoldedItems: [1]
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.

const setUnfoldedToChildren = (item, unfoldedItems) => {
  item.unfolded = _.indexOf(unfoldedItems, item.id) != -1;
  item.children = item.children.map((item, i) => {
    return setUnfoldedToChildren(item, unfoldedItems);
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
    const tree = unflattenEntities(payload.body.projects).map((item, i) => {
      return setUnfoldedToChildren(item, state.unfoldedItems);
    });

    return objectAssign({}, state, {
      tree,
      isLoading: false,
      items: payload.body.projects,
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
    let unfoldedItems = [...state.unfoldedItems];
    if (_.indexOf(state.unfoldedItems, payload.id) == -1) {
      // open
      unfoldedItems.push(payload.id);
    } else {
      // close
      unfoldedItems = _.without(unfoldedItems, payload.id);
    }

    const tree = state.tree.map((item, i) => {
      return setUnfoldedToChildren(item, unfoldedItems);
    });

    return objectAssign({}, state, {
      unfoldedItems,
      tree
    });
  }

}, initialState);

export default reducer;
