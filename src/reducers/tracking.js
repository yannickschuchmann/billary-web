import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';
import {unflattenEntities} from '../businessLogic/treeHelper';
import {moment} from '../businessLogic/calendarHelper';

import * as calls from '../actions';

import objectAssign from 'object-assign';
import deepAssign from 'updeep';

const initialState = {
  view: {
    selected: null,
    isFetching: false,
    tree: [],
    currentTimeEntry: {},
    calendar: {
      selectedDay: moment().startOf('day').toDate(),
      timeEntriesByDay: {}
    }
  },
  _data: {
    selectedId: null,
    projects: [],
    unfoldedItems: []
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

const mapProjectNamesToTimeEntries = (items, projects) => {
  return items.map((item) => {
    item.projectNames = getParentNamesRecursively(projects, item.project_id);
    return item;
  })
}

const getParentNamesRecursively = (projects, project_id, names = []) => {
  const project = findById(projects, project_id);
  if (project.parent_id) {
    _.concat(names, getParentNamesRecursively(projects, project.parent_id, names));
  }
  names.push(project.name)
  return names;
}

const getTimeEntriesByDay = (items) => {
  return _.groupBy(items, (item) => moment(item.started_at).startOf('day').toDate().toString());
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
        projects: payload.body.projects
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
        selected: findById(state._data.projects, payload.id)
      },
      _data: {
        selectedId: payload.id
      }
    }, state);
  },


  // GET_TIME_ENTRIES
  [calls.getTimeEntries.request]: (state, payload) => {
    return state;
  },
  [calls.getTimeEntries.ok]: (state, payload) => {
    const mappedTimeEntries = mapProjectNamesToTimeEntries(payload.body.time_entries, state._data.projects);
    let newState = deepAssign({
      view: {
        calendar: {
          timeEntriesByDay: getTimeEntriesByDay(mappedTimeEntries)
        }
      },
      _data: {
        timeEntries: mappedTimeEntries
      }
    }, state);
    return newState;
  },
  [calls.getTimeEntries.error]: (state, payload) => {
    return state;
  },

  // DELETE_TIME_ENTRY
  [calls.deleteTimeEntry.request]: (state, payload) => {
    return state;
  },
  [calls.deleteTimeEntry.ok]: (state, payload) => {
    let newState = objectAssign({}, state);
    calls.getTimeEntries();
    return newState;
  },
  [calls.deleteTimeEntry.error]: (state, payload) => {
    return state;
  },

  // GET_CURRENT_TIME_ENTRY
  [calls.getCurrentTimeEntry.request]: (state, payload) => {
    return state;
  },
  [calls.getCurrentTimeEntry.ok]: (state, payload) => {
    let currentTimeEntry, selectedId;

    if (payload.body == null) {
      currentTimeEntry = {
        started_at: null
      };
      selectedId = state._data.selectedId;
    } else {
      currentTimeEntry = payload.body.time_entry;
      selectedId = currentTimeEntry.project_id;
    }

    let newState = deepAssign({
      view: {
        selected: findById(state._data.projects, selectedId),
        currentTimeEntry: currentTimeEntry
      },
      _data: {
        selectedId: selectedId
      }
    }, state);
    return newState;
  },
  [calls.getCurrentTimeEntry.error]: (state, payload) => {
    return state;
  },


  // SELECT_DAY
  [calls.selectDay]: (state, payload) => {
    let newState = deepAssign({
      view: {
        calendar: {
          selectedDay: payload.day.moment.toDate()
        }
      }
    }, state);
    return newState;
  }

}, initialState);

export default reducer;