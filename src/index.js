import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { getRoutes } from './routes';
import configureStore from './store/configureStore';
import { configure } from './actions/auth';
import { getUser } from './actions/index';
import { API_URL } from './api/helpers';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)
store.dispatch(configure()).then(() => {
  if (store.getState().auth.user.isSignedIn) store.dispatch(getUser());
  render(
    <Provider store={store}>
      <Router history={history} routes={getRoutes(store)} />
    </Provider>, document.getElementById('app-container')
  );
});

//make sure that Service Workers are supported.
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js', {scope: '/'})
    .then(function (registration) {
        console.log(registration);
    })
    .catch(function (e) {
        console.error(e);
    })
} else {
    console.log('Service Worker is not supported in this browser.');
}
