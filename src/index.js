import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import {configure} from "redux-auth";
import { getRoutes } from './routes';
import configureStore from './store/configureStore';
import { API_URL } from './api';
import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

const store = configureStore();
store.dispatch(configure(
    {apiUrl: API_URL}
  )).then(() => {
    render(
      <Provider store={store}>
        <Router history={browserHistory} routes={getRoutes(store)} />
      </Provider>, document.getElementById('app-container')
    );
  });
