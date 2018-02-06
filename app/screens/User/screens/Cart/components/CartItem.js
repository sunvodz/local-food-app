import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import { Card, Text, QuantityInput } from 'app/components';

export default class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.data.quantity
    };
  }

  removeCartItem(id) {
    this.props.dispatch(actions.removeCartItem(id));
  }

  onChange(newValue) {
    this.setState({quantity: newValue});
    this.props.onUpdate(this.props.data.id, newValue);
  }

  render() {
    const { data, loading } = this.props;
    const cartItem = data.cart_item_relationship[0];

    return (
      <View key={data.ref}>
        <Text>{cartItem.product.name} {data.id}</Text>
        <Icon name='trash' size={24} onPress={this.removeCartItem.bind(this, data.id)} />
        <QuantityInput value={this.state.quantity} onChange={this.onChange.bind(this)} loading={loading} />
      </View>
    );
  }
}
