import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class ContentWrapper extends Component {
  onRefresh() {
    this.props.onRefresh(true);
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
    padding: 15,
  }
};

export default ContentWrapper;
