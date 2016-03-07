import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';

import * as calls from '../actions';

import objectAssign from 'object-assign';

const initialState = {
  currentUser: {
    name: "Yannick Schuchmann",
    profession: "Software Developer"
  }
};

let reducer = createReducer({

}, initialState);

export default reducer;
