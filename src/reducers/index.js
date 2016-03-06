import { combineReducers } from 'redux';
import fuelSavingsAppState from './fuelSavings';
import projectsAppState from './projects';
const rootReducer = combineReducers({
  projectsAppState,
  fuelSavingsAppState
});

export default rootReducer;
