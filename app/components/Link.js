import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default class Link extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={styles.link}>{this.props.title.toUpperCase()}</Text>
      </TouchableOpacity>
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
