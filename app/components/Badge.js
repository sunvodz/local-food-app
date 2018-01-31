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
    backgroundColor: '#e0e0e0',
    color: '#333',
    borderRadius: 15,
    margin: 5,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  activeBadge: {
    backgroundColor: '#efcec4',
    color: '#c4441f',
  }
});
