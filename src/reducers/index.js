import { combineReducers } from 'redux';
import { reducer as uiReducer } from 'redux-ui'
import appState from './app';
import auth from './auth';
import trackingState from './tracking';

const rootReducer = combineReducers({
  appState,
  auth,
  trackingState,
  ui: uiReducer
});

export default rootReducer;
