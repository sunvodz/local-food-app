import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class ServerError extends Component {
  render() {
    return (
      <View style={styles.view}>
        <Icon style={styles.icon} name="times-circle" />
        <Text>Server error</Text>
      </View>
    );
  }
}

const styles = {
  view: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 48,
  }
};

export default ServerError;
