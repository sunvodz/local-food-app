import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppLoading } from 'expo';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Font from 'expo-font';
import { YellowBox } from 'react-native';
import * as Sentry from 'sentry-expo';
import rootReducer from 'app/reducers';
import App from './App';
import { SENTRY_PUBLIC_DSN, SENTRY_ENABLE_IN_EXPO_DEV, SENTRY_DEBUG } from 'app/env';

Sentry.init({
  dsn: SENTRY_PUBLIC_DSN,
  enableInExpoDevelopment: SENTRY_ENABLE_IN_EXPO_DEV,
  debug: SENTRY_DEBUG,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

YellowBox.ignoreWarnings(['Accessing view manager']);

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    // ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
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
