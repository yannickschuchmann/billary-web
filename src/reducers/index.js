import { combineReducers } from 'redux';
import { reducer as ui } from 'redux-ui'
import app from './app';
import auth from './auth';
import tracking from './tracking';


const rootReducer = combineReducers({
  app,
  auth,
  tracking,
  ui
});

export default rootReducer;
