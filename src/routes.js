import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './containers/App';
import Tracking from './containers/TrackingPage.js';
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
    <Route path="/" component={App}>
      <IndexRedirect to="tracking" />
      <Route path="tracking" component={Tracking} onEnter={requireAuth}/>
      <Route path="about" component={AboutPage}/>
      <Route path="*" component={NotFoundPage} />
    </Route>
  );
}
