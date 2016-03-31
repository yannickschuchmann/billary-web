import { combineReducers } from 'redux';
import { reducer as ui } from 'redux-ui';
import app from './app';
import auth from './auth';
import tracking from './tracking';
import { routerReducer } from 'react-router-redux'


const rootReducer = combineReducers({
  app,
  auth,
  ui,
  routing: routerReducer,
  tracking
});

export default rootReducer;
