import {createActionAsync} from 'redux-act-async';
import * as calls from '../api';

export let getProjects = createActionAsync('GET_PROJECTS', calls.getProjects);
export let postProject = createActionAsync('POST_PROJECT', calls.postProject);
export let deleteProject = createActionAsync('DELETE_PROJECT', calls.deleteProject);
