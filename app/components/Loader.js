import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Loader extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <ActivityIndicator color='#ccc' size='large' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f0',
  }
});
