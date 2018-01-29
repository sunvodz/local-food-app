import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import MainNavigation from 'app/navigations/MainNavigation';
import { Alert } from 'app/containers';

export default class App extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Alert />    
        <MainNavigation />    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
