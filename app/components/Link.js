import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import globalStyle from 'app/styles';

export default class Link extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={styles.link}>{this.props.title.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }
}

let styles = {
  link: {
    color: globalStyle.primaryColor,
    fontSize: 14,
    fontFamily: 'montserrat-semibold'
  }
};
