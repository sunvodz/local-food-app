import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import MainNavigation from 'app/navigations/MainNavigation';

export default class App extends Component {
  render() {
    return (
      <View style={styles.view}>
        <MainNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24
  }
});
