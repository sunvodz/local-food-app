import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

class ContentWrapper extends Component {
  render() {
    return (
      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentWrapper: {
    backgroundColor: '#eee',
    flex: 1,
  },
  scrollView: {
    padding: 20
  }
});

export default ContentWrapper;
