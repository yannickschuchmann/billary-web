import { combineReducers } from 'redux';
import fuelSavingsAppState from './fuelSavings';
import projectsState from './projects';
import appState from './app';
const rootReducer = combineReducers({
  appState,
  projectsState,
  fuelSavingsAppState
});

export default rootReducer;
