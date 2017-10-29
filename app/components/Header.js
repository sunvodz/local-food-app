import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>{this.props.label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  }
});
