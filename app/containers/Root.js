import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import * as reducers from '../reducers';
import App from './App';

const reducer = combineReducers(reducers);
const store = createStore(reducer, applyMiddleware(thunk))

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
