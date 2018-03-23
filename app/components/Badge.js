import React from 'react';
import { Text } from 'react-native';

export default class Badge extends React.Component {
  render() {
    return (
      <Text onPress={this.props.onPress} style={[styles.badge, this.props.selected && styles.activeBadge]}>{this.props.label}</Text>
    );
  }
}

const styles = {
  badge: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e4e4e0',
    color: '#333',
    borderRadius: 15,
    margin: 5,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  activeBadge: {
    backgroundColor: '#efcec4',
    borderColor: 'transparent',
    color: '#c4441f',
  }
};
