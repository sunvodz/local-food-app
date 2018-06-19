import React from 'react';
import { Text } from 'react-native';
import styleMerger from 'app/shared/utils/styleMerger';

export default class TextComponent extends React.Component {
  render() {
    let mergedStyles = styleMerger.merge(styles, this.props.style);

    return (
      <Text {...this.props} style={mergedStyles.text}>{this.props.children}</Text>
    );
  }
}

let styles = {
  text: {
    color: '#333',
    fontFamily: 'montserrat-regular'
  }
};
