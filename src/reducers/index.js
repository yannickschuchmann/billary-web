import { combineReducers } from 'redux';
import { reducer as uiReducer } from 'redux-ui'
import appState from './app';
import trackingState from './tracking';
import {authStateReducer} from "redux-auth";

const rootReducer = combineReducers({
  appState,
  auth: authStateReducer,
  trackingState,
  ui: uiReducer
});

export default rootReducer;
