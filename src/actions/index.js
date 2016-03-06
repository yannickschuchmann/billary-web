import {createActionAsync} from 'redux-act-async';
import * as calls from '../api';

export let getProjects = createActionAsync('FURFM', calls.fetchProjects);
