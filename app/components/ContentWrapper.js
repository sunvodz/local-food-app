import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class ContentWrapper extends Component {
  onRefresh() {
    this.props.onRefresh(true);
  }

  mergeStyles() {
    let mergeStyles = {};

    Object.keys(styles).map(key => {
      mergeStyles[key] = styles[key];

      if (this.props.style && this.props.style[key]) {
        mergeStyles[key] = Object.assign({}, styles[key], this.props.style[key]);
      }
    });

    return mergeStyles;
  }

  render() {
    let scrollViewProps = {
      contentContainerStyle: styles.scrollView,
      keyboardShouldPersistTaps: 'always',
      enableOnAndroid: true,
      extraScrollHeight: 50,
    };

    if (this.props.onRefresh) {
      scrollViewProps.refreshControl = (
        <RefreshControl refreshing={this.props.refreshing} onRefresh={this.onRefresh.bind(this)} />
      );
    }

    let mergedStyles = this.mergeStyles();

    return (
      <View style={styles.view}>
        <KeyboardAwareScrollView {...scrollViewProps}>
          {this.props.children}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = {
  view: {
    backgroundColor: '#f4f4f0',
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
};

export default ContentWrapper;
