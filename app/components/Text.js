import React from 'react';
import { Text } from 'react-native';

export default class TextComponent extends React.Component {
  mergeStyles() {
    let mergeStyles = {};

    mergeStyles['text'] = Object.assign({}, styles['text'], this.props.style);

    return mergeStyles;
  }

  render() {
    let mergedStyles = this.mergeStyles();

    return (
      <Text {...this.props} style={mergedStyles.text}>{this.props.children}</Text>
    );
  }
}

const styles = {
  text: {
    fontFamily: 'montserrat-regular'
  }
};
