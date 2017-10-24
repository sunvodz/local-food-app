import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    backgroundColor: '#ff0000',
    paddingTop: 24
  }
});
