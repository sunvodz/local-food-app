import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

class ContentWrapper extends Component {
  render() {
    return (
      <View style={styles.contentWrapper}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentWrapper: {
    backgroundColor: '#eee',
    flex: 1,
    padding: 20
  }
});

export default ContentWrapper;
