import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default class TextComponent extends React.Component {
  render() {
    // merge styles?

    return (
      <Text {...this.props} style={styles.text}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'montserrat-regular'
  }
});
