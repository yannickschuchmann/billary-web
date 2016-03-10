import { combineReducers } from 'redux';
import { reducer as uiReducer } from 'redux-ui'
import projectsState from './projects';
import appState from './app';
const rootReducer = combineReducers({
  appState,
  projectsState,
  ui: uiReducer
});

export default rootReducer;
