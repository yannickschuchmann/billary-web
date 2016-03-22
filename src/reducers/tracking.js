import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';
import {unflattenEntities} from '../businessLogic/treeHelper';
import {moment} from '../businessLogic/calendarHelper';
import {findById, mapProjectNames} from '../businessLogic/projectHelper';
import {
  getStartedAtWithOverhang,
  getStoppedAtWithOverhang,
  getDurationWithOverhang
} from '../businessLogic/timeEntryHelper';

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
    },
    projectWrappedTimeEntries: {},
    projects: [],
    projectsById: {}
  },
  _data: {
    selectedProject: null,
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

const getTimeEntriesByDay = (items) => {
  return _.groupBy(extendItemsDueOverhang(items), 'groupDate');
}

const extendItemsDueOverhang = (items) => {
  let newItems = [];
  _.forEach(items, (item, i) => {
    const startedAt = moment(item.started_at);
    const stoppedAt = moment(item.stopped_at);
    const daysDiff = Math.abs(startedAt
                        .startOf('day')
                        .diff(stoppedAt.startOf('day'), 'days'));

    for (let i = 0; i <= daysDiff; i++) {
      const tmp = objectAssign({}, item, {
        groupDate: startedAt.add(i > 0 ? 1 : 0, 'day').startOf('day').toDate().toString(),
        currentDayOverhang: i,
        daysOverhang: daysDiff
      });
      newItems.push(objectAssign({}, tmp, {
        started_at_overhang: getStartedAtWithOverhang(tmp),
        stopped_at_overhang: getStoppedAtWithOverhang(tmp),
        duration_overhang: getDurationWithOverhang(tmp)
      }));
    }
  });
  return newItems;
}

const getTimeEntriesByDayAndProject = (items) => {
  /*
  {
    day: [
      project_id: [timeEntries]
    ]
  }
  */
  return _.mapValues(getTimeEntriesByDay(items), (items) =>
    _.groupBy(items, (item) => item.project_id)
  );
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
    const mappedProjects = mapProjectNames(payload.body.projects, payload.body.projects, 'id');
    const tree = unflattenEntities(payload.body.projects).map((item, i) => {
      return setUnfoldedToChildren(item, state._data.unfoldedItems);
    });
    return deepAssign({
      view: {
        tree: tree,
        isFetching: false,
        selected: state.view.projectsById[state._data.selectedProject],
        projects: mappedProjects,
        projectsById: _.keyBy(payload.body.projects, "id")
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
        selected: state.view.projectsById[payload.id]
      },
      _data: {
        selectedProject: payload.id
      }
    }, state);
  },


  // GET_TIME_ENTRIES
  [calls.getTimeEntries.request]: (state, payload) => {
    return state;
  },
  [calls.getTimeEntries.ok]: (state, payload) => {
    const mappedTimeEntries = mapProjectNames(payload.body.time_entries, state.view.projects);
    let newState = deepAssign({
      view: {
        calendar: {
          timeEntriesByDay: getTimeEntriesByDay(mappedTimeEntries)
        },
        projectWrappedTimeEntries: () => getTimeEntriesByDayAndProject(mappedTimeEntries)
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
    let currentTimeEntry, selectedProject;

    if (payload.body == null) {
      currentTimeEntry = {
        started_at: null
      };
      selectedProject = state._data.selectedProject;
    } else {
      currentTimeEntry = payload.body.time_entry;
      selectedProject = currentTimeEntry.project_id;
    }

    let newState = deepAssign({
      view: {
        selected: state.view.projectsById[selectedProject],
        currentTimeEntry: currentTimeEntry
      },
      _data: {
        selectedProject: selectedProject
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
