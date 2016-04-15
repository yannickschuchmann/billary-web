import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import Site from './containers/Site';
import Content from './containers/Content';

import StartPage from './pages/StartPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SignOutPage from './pages/SignOutPage';
import AboutPage from './pages/AboutPage';
import SettingsPage from './pages/settings';
import ChangePasswordPage from './pages/settings/ChangePassword';
import DeleteAccountPage from './pages/settings/DeleteAccount';
import NotFoundPage from './pages/NotFoundPage';

import App from './containers/App';
import Admin from './containers/Admin';
import Assignments from './containers/Assignments';
import Clients from './containers/Clients';
import Dashboard from './containers/Dashboard';
import Invoices from './containers/Invoices';
import Tracking from './containers/Tracking';
import Company from './containers/Company';


export function getRoutes(store) {
  const requireAuth = (nextState, transition, cb) => {
    // the setTimeout is necessary because of this bug:
    // https://github.com/rackt/redux-router/pull/62
    // this will result in a bunch of warnings, but it doesn't seem to be a serious problem
    setTimeout(() => {
      if (!store.getState().auth.user.isSignedIn) {
        transition("/login");
      }
      cb();
    }, 0);
  };

  const skipAuthIfSignedIn = (nextState, transition, cb) => {
    setTimeout(() => {
      if (store.getState().auth.user.isSignedIn) {
        transition("/");
      }
      cb();
    }, 0)
  }

  return (
    <Route path="/" component={Site}>
      <Route component={Content}>
        <IndexRoute component={StartPage}/>
        <Route path="login" component={SignInPage} onEnter={skipAuthIfSignedIn} />
        <Route path="register" component={SignUpPage} onEnter={skipAuthIfSignedIn} />
        <Route path="logout" component={SignOutPage} />
        <Route path="about" component={AboutPage}/>
        <Route path="settings" component={SettingsPage} onEnter={requireAuth}>
          <IndexRedirect to="change-password" />
          <Route path="change-password" component={ChangePasswordPage}/>
          <Route path="delete-account" component={DeleteAccountPage}/>
        </Route>
      </Route>
      <Route path="app" component={App} onEnter={requireAuth}>
        <IndexRedirect to="tracking" />
        <Route path="tracking" component={Tracking} />
        <Route component={Admin}>
          <Route path="assignments" component={Assignments} />
          <Route path="clients" component={Clients} />
          <Route path="dashboard" component={Dashboard} />
          <Route path="invoices" component={Invoices} />
          <Route path="company" component={Company} />
        </Route>
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
}
