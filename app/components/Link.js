import React from 'react';
import { Text } from 'react-native';

export default class Link extends React.Component {
  render() {
    return (
      <Text style={styles.link} onPress={this.props.onPress}>{this.props.title.toUpperCase()}</Text>
    );
  }
}

const styles = {
  link: {
    color: '#c0370c',
    fontSize: 14,
    fontFamily: 'montserrat-semibold'
  }
};
