import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Font, AppLoading } from 'expo'
import Sentry from 'sentry-expo';
import { SENTRY_PUBLIC_DSN, SENTRY_ENABLE_IN_DEV, PUSHER_LOG_TO_CONSOLE } from 'react-native-dotenv';
import Pusher from 'pusher-js/react-native';

import rootReducer from './rootReducer';
import App from './App';

const store = createStore(rootReducer, applyMiddleware(thunk));

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = SENTRY_ENABLE_IN_DEV;
Pusher.logToConsole = PUSHER_LOG_TO_CONSOLE;

Sentry.config(SENTRY_PUBLIC_DSN).install();

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    await Font.loadAsync({
      'montserrat-regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
      'montserrat-medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
      'montserrat-semibold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
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
