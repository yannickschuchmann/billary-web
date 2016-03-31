import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { getRoutes } from './routes';
import configureStore from './store/configureStore';
import { configure } from './actions/auth';
import { API_URL } from './api';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)
store.dispatch(configure()).then(() => {
    render(
      <Provider store={store}>
        <Router history={history} routes={getRoutes(store)} />
      </Provider>, document.getElementById('app-container')
    );
  });
