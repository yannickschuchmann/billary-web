import {createActionAsync} from 'redux-act-async';
import {createAction} from 'redux-act';
import * as projectApi from '../api/projects';
import * as timeEntryApi from '../api/timeEntries';
import * as clientApi from '../api/clients';
import * as userApi from '../api/users';
import * as companyApi from '../api/companies';
import * as invoiceApi from '../api/invoices';

export let hideSnackbar = createAction('HIDE_SNACKBAR');

export let getUser = createActionAsync('GET_USER', userApi.getUser);
export let patchCompany = createActionAsync('PATCH_COMPANY', companyApi.patchCompany);

export let getProjects = createActionAsync('GET_PROJECTS', projectApi.getProjects);
export let patchProject = createActionAsync('PATCH_PROJECT', projectApi.patchProject);
export let postProject = createActionAsync('POST_PROJECT', projectApi.postProject);
export let deleteProject = createActionAsync('DELETE_PROJECT', projectApi.deleteProject);
export let assignClientToProject = createActionAsync('ASSIGN_CLIENT_TO_PROJECT', projectApi.patchProject);
export let openProject = createAction('OPEN_PROJECT', (id) => ({id}));
export let selectProject = createAction('SELECT_PROJECT', (id) => ({id}));

export let getTimeEntries = createActionAsync('GET_TIME_ENTRIES', timeEntryApi.getTimeEntries);
export let patchTimeEntry = createActionAsync('PATCH_TIME_ENTRY', timeEntryApi.patchTimeEntry);
export let postTimeEntry = createActionAsync('POST_TIME_ENTRY', timeEntryApi.postTimeEntry);
export let deleteTimeEntry = createActionAsync('DELETE_TIME_ENTRY', timeEntryApi.deleteTimeEntry);
export let getCurrentTimeEntry = createActionAsync('GET_CURRENT_TIME_ENTRY', timeEntryApi.getCurrentTimeEntry);
export let stopTimeEntry = createActionAsync('STOP_TIME_ENTRY', timeEntryApi.stopTimeEntry);

export let getClients = createActionAsync('GET_CLIENTS', clientApi.getClients);
export let postClient = createActionAsync('POST_CLIENT', clientApi.postClient);
export let patchClient = createActionAsync('PATCH_CLIENT', clientApi.patchClient);
export let deleteClient = createActionAsync('DELETE_CLIENT', clientApi.deleteClient);

export let generateInvoices = createActionAsync('GENERATE_INVOICES', invoiceApi.generateInvoices);
export let getInvoices = createActionAsync('GET_INVOICES', invoiceApi.getInvoices);
export let patchInvoice = createActionAsync('PATCH_INVOICE', invoiceApi.patchInvoice);
export let postInvoice = createActionAsync('POST_INVOICE', invoiceApi.postInvoice);
export let deleteInvoice = createActionAsync('DELETE_INVOICE', invoiceApi.deleteInvoice);

export let selectDay = createAction('SELECT_DAY', (day) => ({day}));
