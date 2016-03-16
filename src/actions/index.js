import {createActionAsync} from 'redux-act-async';
import {createAction} from 'redux-act';
import * as calls from '../api';

export let getProjects = createActionAsync('GET_PROJECTS', calls.getProjects);
export let postProject = createActionAsync('POST_PROJECT', calls.postProject);
export let deleteProject = createActionAsync('DELETE_PROJECT', calls.deleteProject);
export let openProject = createAction('OPEN_PROJECT', (id) => ({id}));
export let selectProject = createAction('SELECT_PROJECT', (id) => ({id}));

export let getTimeEntries = createActionAsync('GET_TIME_ENTRIES', calls.getTimeEntries);
export let getCurrentTimeEntry = createActionAsync('GET_CURRENT_TIME_ENTRY', calls.getCurrentTimeEntry);
export let patchTimeEntry = createActionAsync('PATCH_TIME_ENTRY', calls.patchTimeEntry);
export let deleteTimeEntry = createActionAsync('DELETE_TIME_ENTRY', calls.deleteTimeEntry);
export let postTimeEntry = createActionAsync('POST_TIME_ENTRY', calls.postTimeEntry);
export let stopTimeEntry = createActionAsync('STOP_TIME_ENTRY', calls.stopTimeEntry);

export let selectDay = createAction('SELECT_DAY', (day) => ({day}));
