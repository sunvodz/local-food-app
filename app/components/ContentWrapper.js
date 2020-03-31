import React, { Component } from 'react';
import { View, RefreshControl } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import globalStyle from 'app/styles';

class ContentWrapper extends Component {
  onRefresh() {
    this.props.onRefresh(true);
  }

  render() {
    let scrollViewProps = {
      contentContainerStyle: styles.scrollView,
      keyboardShouldPersistTaps: 'always',
      enableOnAndroid: true,
      viewIsInsideTabBar: true,
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

let styles = {
  view: {
    backgroundColor: globalStyle.backgroundColor,
    flex: 1,
  },
  scrollView: {
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 0,
  }
};

export default ContentWrapper;
