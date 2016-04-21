import { combineReducers } from 'redux';
import { reducer as ui } from 'redux-ui';
import app from './app';
import assignments from './assignments';
import auth from './auth';
import clients from './clients';
import company from './company';
import invoices from './invoice';
import notification from './notification';
import tracking from './tracking';
import { routerReducer } from 'react-router-redux'


const rootReducer = combineReducers({
  app,
  assignments,
  auth,
  clients,
  company,
  invoices,

  ui,
  notification,
  routing: routerReducer,
  tracking
});

export default rootReducer;
