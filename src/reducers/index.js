import { combineReducers } from 'redux';
import { reducer as uiReducer } from 'redux-ui'
import appState from './app';
import projectsState from './projects';
const rootReducer = combineReducers({
  appState,
  projectsState,
  ui: uiReducer
});

export default rootReducer;
