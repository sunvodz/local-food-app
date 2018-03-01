import React from 'react';
import { View, ListView, RefreshControl } from 'react-native';

export default class List extends React.Component {
  render() {
    let props = this.props;
    let refreshing = this.props.refreshing || false;

    props.refreshControl = <RefreshControl onRefresh={this.props.onRefresh} refreshing={refreshing} />;

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <ListView {...props} />
      </View>
    );
  }
}
