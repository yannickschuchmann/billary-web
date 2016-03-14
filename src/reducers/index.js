import { combineReducers } from 'redux';
import { reducer as uiReducer } from 'redux-ui'
import appState from './app';
import trackingState from './tracking';
const rootReducer = combineReducers({
  appState,
  trackingState,
  ui: uiReducer
});

export default rootReducer;
