import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk)
  ));
}
