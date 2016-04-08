import { combineReducers } from 'redux';
import { reducer as ui } from 'redux-ui';
import app from './app';
import auth from './auth';
import clients from './clients';
import tracking from './tracking';
import notification from './notification';
import { routerReducer } from 'react-router-redux'


const rootReducer = combineReducers({
  app,
  auth,
  clients,
  ui,
  notification,
  routing: routerReducer,
  tracking
});

export default rootReducer;
