import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {AppLoading, ScreenOrientation } from 'expo'
import * as Font from 'expo-font';
import * as Sentry from 'sentry-expo';
import { SENTRY_PUBLIC_DSN, SENTRY_ENABLE_IN_DEV, PUSHER_LOG_TO_CONSOLE } from 'app/env';
import Pusher from 'pusher-js/react-native';
import {YellowBox} from 'react-native';

import rootReducer from 'app/reducers';
import App from './App';

const store = createStore(rootReducer, applyMiddleware(thunk));

// Remove this once Sentry is correctly setup.
// Sentry.enableInExpoDevelopment = SENTRY_ENABLE_IN_DEV;
// Pusher.logToConsole = PUSHER_LOG_TO_CONSOLE;

// Sentry.config(SENTRY_PUBLIC_DSN).install();


// Sentry.init({
//   dsn: SENTRY_PUBLIC_DSN,
//   enableInExpoDevelopment: SENTRY_ENABLE_IN_DEV,
//   debug: true
// });

YellowBox.ignoreWarnings(['Accessing view manager']);

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
    await Font.loadAsync({
      'montserrat-regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
      'montserrat-medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
      'montserrat-semibold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
      'montserrat-bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
