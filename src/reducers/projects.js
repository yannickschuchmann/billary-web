import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';
import {unflattenEntities} from '../businessLogic/treeHelper';

import * as calls from '../actions';

import objectAssign from 'object-assign';
import deepAssign from 'updeep';

const initialState = {
  view: {
    selected: null,
    isFetching: false,
    tree: []
  },
  _data: {
    selectedId: 1,
    collection: [],
    unfoldedItems: [1]
  }
};

//IMPORTANT: Note that with Redux, state should NEVER be changed.
//State is considered immutable. Instead,
//create a copy of the state passed and set new values on the copy.
//Note that I'm using Object.assign to create a copy of current state
//and update values on the copy.

const setUnfoldedToChildren = (item, unfoldedItems) => {
  const newItem = objectAssign({}, item, {
    unfolded: _.indexOf(unfoldedItems, item.id) != -1,
    children: item.children.map((item, i) => {
      return setUnfoldedToChildren(item, unfoldedItems);
    })
  });
  return newItem;
}

const findById = (items, id) => {
  return _.findLast(items, {id})
}

let reducer = createReducer({

  // GET_PROJECTS
  [calls.getProjects.request]: (state, payload) => {
    return deepAssign({
      view: {
        isFetching: true
      }
    }, state);
  },
  [calls.getProjects.ok]: (state, payload) => {
    const tree = unflattenEntities(payload.body.projects).map((item, i) => {
      return setUnfoldedToChildren(item, state._data.unfoldedItems);
    });
    return deepAssign({
      view: {
        tree: tree,
        isFetching: false,
        selected: findById(payload.body.projects, state._data.selectedId)
      },
      _data: {
        collection: payload.body.projects
      }
    }, state);
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
    let unfoldedItems = [...state._data.unfoldedItems];
    if (_.indexOf(unfoldedItems, payload.id) == -1) {
      // open
      unfoldedItems.push(payload.id);
    } else {
      // close
      unfoldedItems = _.without(unfoldedItems, payload.id);
    }

    const tree = state.view.tree.map((item, i) => {
      return setUnfoldedToChildren(item, unfoldedItems);
    });

    return deepAssign({
      view: {
        tree
      },
      _data: {
        unfoldedItems,
      }
    }, state);
  },

  // SELECT_PROJECT
  [calls.selectProject]: (state, payload) => {
    return deepAssign({
      view: {
        selected: findById(state._data.collection, payload.id)
      },
      _data: {
        selectedId: payload.id
      }
    }, state);
  }

}, initialState);

export default reducer;
