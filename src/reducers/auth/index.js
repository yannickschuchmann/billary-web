import thunk from 'redux-thunk'
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createReducer} from 'redux-act';
import _ from 'lodash';

import authentication from './authentication';
import user from './user';
import objectAssign from 'object-assign';

export default combineReducers({
  authentication,
  user
});
