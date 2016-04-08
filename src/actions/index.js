import {createActionAsync} from 'redux-act-async';
import {createAction} from 'redux-act';
import * as projectApi from '../api/projects';
import * as timeEntryApi from '../api/timeEntries';
import * as clientApi from '../api/clients';

export let hideSnackbar = createAction('HIDE_SNACKBAR');

export let getProjects = createActionAsync('GET_PROJECTS', projectApi.getProjects);
export let patchProject = createActionAsync('PATCH_PROJECT', projectApi.patchProject);
export let postProject = createActionAsync('POST_PROJECT', projectApi.postProject);
export let deleteProject = createActionAsync('DELETE_PROJECT', projectApi.deleteProject);
export let openProject = createAction('OPEN_PROJECT', (id) => ({id}));
export let selectProject = createAction('SELECT_PROJECT', (id) => ({id}));

export let getTimeEntries = createActionAsync('GET_TIME_ENTRIES', timeEntryApi.getTimeEntries);
export let getCurrentTimeEntry = createActionAsync('GET_CURRENT_TIME_ENTRY', timeEntryApi.getCurrentTimeEntry);
export let patchTimeEntry = createActionAsync('PATCH_TIME_ENTRY', timeEntryApi.patchTimeEntry);
export let deleteTimeEntry = createActionAsync('DELETE_TIME_ENTRY', timeEntryApi.deleteTimeEntry);
export let postTimeEntry = createActionAsync('POST_TIME_ENTRY', timeEntryApi.postTimeEntry);
export let stopTimeEntry = createActionAsync('STOP_TIME_ENTRY', timeEntryApi.stopTimeEntry);

export let getClients = createActionAsync('GET_CLIENTS', clientApi.getClients);

export let selectDay = createAction('SELECT_DAY', (day) => ({day}));
