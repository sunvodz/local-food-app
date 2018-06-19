import React from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import styleMerger from 'app/shared/utils/styleMerger';
import globalStyle from 'app/styles';

export default class List extends React.Component {
  onRefresh() {
    this.props.onRefresh();
  }

  render() {
    let refreshing = this.props.refreshing || false;
    let mergedStyles = styleMerger.merge(styles, this.props.style);

    return (
      <ListView {...this.props} contentContainerStyle={{padding: 15}} removeClippedSubviews={false} refreshControl={<RefreshControl onRefresh={this.onRefresh.bind(this)} refreshing={refreshing} />} style={mergedStyles.list} />
    );
  }
}

let styles = {
  list: {
    backgroundColor: globalStyle.backgroundColor,
  }
};