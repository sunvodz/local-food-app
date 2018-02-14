import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import { Card, Text, QuantityInput } from 'app/components';

export default class CartItem extends React.Component {
  removeCartItem() {
    this.props.dispatch(actions.removeCartItem(this.props.data.id));
  }

  onChange(newValue) {
    this.props.onUpdate(this.props.data.id, newValue);
  }

  render() {
    const { data } = this.props;
    const cartItem = data.cart_item_relationship[0];

    return (
      <View key={data.ref}>
        <Text>{cartItem.product.name} {data.id}</Text>
        <Icon name='trash' size={24} onPress={this.removeCartItem.bind(this)} />
        <QuantityInput loading={this.props.loading} value={data.quantity} onChange={this.onChange.bind(this)} />
      </View>
    );
  }
}
