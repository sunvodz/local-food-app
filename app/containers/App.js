import React, { Component } from 'react';
import { View } from 'react-native';

import MainNavigation from 'app/navigations/MainNavigation';
import { Alert } from 'app/containers';

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Alert />
        <MainNavigation />
      </View>
    );
  }
}
