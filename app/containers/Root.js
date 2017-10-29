import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { Font } from 'expo';

import rootReducer from './rootReducer';
import App from './App';

const store = createStore(rootReducer, applyMiddleware(thunk))

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
