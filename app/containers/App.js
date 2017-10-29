import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Navigation from '../components/Navigation';

export default class App extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 24
  }
});
