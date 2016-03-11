import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './containers/App';
import Tracking from './containers/TrackingPage.js';
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="tracking" />
    <Route path="tracking" component={Tracking}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
