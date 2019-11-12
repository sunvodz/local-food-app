import React from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import styleMerger from 'app/shared/utils/styleMerger';
import globalStyle from 'app/styles';

export default class List extends React.Component {
  onRefresh = () => {
    this.props.onRefresh();
  }

  render() {
    let refreshing = this.props.refreshing || false;
    let mergedStyles = styleMerger.merge(styles, this.props.style);
    

    return (
      <FlatList 
      {...this.props} 
      contentContainerStyle={{padding: 15}} 
      removeClippedSubviews={false} 
      onRefresh={this.onRefresh}
      refreshing={refreshing}
      style={mergedStyles.list} 
      keyExtractor={(item, index) => item.key || index.toString()}
      />
    );
  }
}

let styles = {
  list: {
    backgroundColor: globalStyle.backgroundColor,
  }
};