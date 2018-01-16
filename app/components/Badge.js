import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default class Badge extends React.Component {
  render() {
    return (
      <Text onPress={this.props.onPress} style={[styles.badge, this.props.selected && styles.activeBadge]}>{this.props.label}</Text>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#bc3b1f',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: 15,
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeBadge: {
    backgroundColor: 'blue'
  }
});
