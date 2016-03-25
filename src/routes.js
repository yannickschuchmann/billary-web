import React from 'react';
import { Route, IndexRedirect, IndexRoute } from 'react-router';

import Site from './containers/Site';
import Content from './containers/Content';

import StartPage from './pages/StartPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

import App from './containers/App';
import Tracking from './containers/Tracking';


export function getRoutes(store) {
  const requireAuth = (nextState, transition, cb) => {
    // the setTimeout is necessary because of this bug:
    // https://github.com/rackt/redux-router/pull/62
    // this will result in a bunch of warnings, but it doesn't seem to be a serious problem
    setTimeout(() => {
      if (!store.getState().auth.getIn(["user", "isSignedIn"])) {
        transition(null, "/login");
      }
      cb();
    }, 0);
  };

  return (
    <Route path="/" component={Site}>
      <Route component={Content}>
        <IndexRoute component={StartPage}/>
        <Route path="login" component={SignInPage} />
        <Route path="register" component={SignUpPage} />
        <Route path="about" component={AboutPage}/>
      </Route>
      <Route path="app" component={App}>
        <IndexRedirect to="tracking" />
        <Route path="tracking" component={Tracking} />
      </Route>
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
}
