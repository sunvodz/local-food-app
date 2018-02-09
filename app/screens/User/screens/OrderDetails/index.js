import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, ListView, RefreshControl } from 'react-native';
import moment from 'moment';

import { ContentWrapper, Card, Loader } from 'app/components';

class OrderDetails extends Component {
  getOrder() {
    return this.props.navigation.state.params || null;
  }

  render() {
    const order = this.getOrder();

    if (!order) {
      return null;
    }

    return (
      <View style={{flex: 1}}>
        <ContentWrapper>
          <Text>{order.ref}</Text>
        </ContentWrapper>
      </View>
    );
  }
}

export default OrderDetails;
