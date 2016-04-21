import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';

import * as calls from '../actions/index';

import objectAssign from 'object-assign';

const initialState = {
  data: [],
  isFetching: true,
  isGenerating: false
};

let reducer = createReducer({
  [calls.getInvoices.request]: (state, payload) => (objectAssign({}, state, {
    isFetching: true
  })),
  [calls.getInvoices.ok]: (state, payload) => (objectAssign({}, state, {
    data: payload.body.invoices,
    isFetching: false
  })),
  [calls.getInvoices.error]: (state, payload) => (objectAssign({}, state, {
    isFetching: false
  })),
  [calls.generateInvoices.request]: (state, payload) => (objectAssign({}, state, {
    isGenerating: true
  })),
  [calls.generateInvoices.ok]: (state, payload) => (objectAssign({}, state, {
    isGenerating: false
  }))
}, initialState);

export default reducer;
