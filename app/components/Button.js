import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <Text style={styles.title}>{this.props.title.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#bc3b1f',
    padding: 10,
    borderRadius: 100,
  },
  title: {
    color: '#fff',
    alignSelf: 'center',
    fontWeight: 'bold',
  }
});
