import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import _ from 'lodash';

import { Card, Text, Link } from 'app/components';
import { trans } from 'app/shared';

export default class CartItem extends React.Component {
  removeCartItem() {
    this.props.onRemove(this.props.data.id);
  }

  onDecrease() {
    let newQuantity = parseInt(this.props.data.quantity) - 1;

    if (newQuantity >= 0) {
      this.onChange(newQuantity);
    }
  }

  onIncrease() {
    let newQuantity = parseInt(this.props.data.quantity) + 1;
    this.onChange(newQuantity);
  }

  onChange(newValue) {
    this.props.onUpdate(this.props.data.id, newValue);
  }

  render() {
    const { data } = this.props;
    const cartItem = data.cart_item_relationship[0];
    const product = cartItem.product;
    const variant = cartItem.variant;
    const producer = cartItem.producer;

    let productUnitString = '';
    if (product.package_unit && product.package_unit !== 'product') {
      productUnitString = `/${product.package_unit}`;
    }

    let variantName = null;
    let productPrice = `${product.price} ${producer.currency}${productUnitString}`;
    let totalPrice = `${data.quantity * product.price} ${producer.currency}`;

    if (variant) {
      variantName = <Text style={styles.productName} numberOfLines={1}>{variant.name}</Text>;
      productPrice = `${variant.price} ${producer.currency}${productUnitString}`;
      totalPrice = `${data.quantity * variant.price} ${producer.currency}`;
    }

    let quantity = (
      <View style={styles.quantity}>
        <View style={quantityStyle.quantity}>
          <TouchableOpacity style={quantityStyle.decrease} onPress={this.onDecrease.bind(this)}>
            <Icon name='minus-circle' style={quantityStyle.icon} />
          </TouchableOpacity>
          <View style={quantityStyle.buttonWrapper}>
            <View style={quantityStyle.button}>
              <Text style={quantityStyle.buttonText}>{data.quantity}</Text>
            </View>
          </View>
          <TouchableOpacity style={quantityStyle.increase} onPress={this.onIncrease.bind(this)}>
            <Icon  name='plus-circle' style={quantityStyle.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );

    let trash = <Link title={trans('delete', this.props.lang)} onPress={this.removeCartItem.bind(this)} />;

    return (
      <View style={styles.listItem}>
        <Card key={data.ref} footer={trash} style={styles.card}>
          <Text numberOfLines={1} style={styles.productName}>{cartItem.product.name.toUpperCase()}</Text>
          {variantName}
          <View style={styles.producerNodeWrapper}>
            <Text style={styles.producer}>{cartItem.producer.name} - {cartItem.node.name}</Text>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.priceWrapper}>
              <Icon name='tag' size={16} style={styles.priceIcon} />
              <Text>{productPrice}</Text>
            </View>

            <View numberOfLines={1} style={styles.priceWrapper}>
              <Icon name='shopping-basket' size={16} style={styles.priceIcon} />
              <Text>{totalPrice}</Text>
            </View>
          </View>
          <View style={[styles.row, styles.quantityRow]}>
            {quantity}
          </View>
        </Card>
      </View>
    );
  }
}

const styles = {
  listItem: {
    paddingHorizontal: 10,
  },
  card: {
    card: {
      marginBottom: 0
    }
  },
  productName: {
    fontFamily: 'montserrat-regular',
  },
  producerNodeWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  producer: {
    color: '#b4b4b0',
    fontFamily: 'montserrat-regular',
  },
  node: {
    color: '#b4b4b0',
    fontFamily: 'montserrat-regular',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityRow: {
    marginTop: 15,
  },
  quantity: {
    flex: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceWrapper: {
    flexDirection: 'row',
  },
  priceIcon: {
    color: '#bc3b1f',
    width: 24,
  }
}

const quantityStyle = {
  quantity: {
    backgroundColor: '#fff',
    borderColor: '#e4e4e0',
    justifyContent: 'center',
    flex: 2,
    flexDirection: 'row',
  },
  variantName: {
    fontFamily: 'montserrat-semibold',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'montserrat-regular',
  },
  alignRight: {
    textAlign: 'right',
  },
  decrease: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  increase: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#333',
    fontSize: 30,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#bc3b1f',
    borderRadius: 100,
    padding: 10,
    width: 60,
    height: 60,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    fontSize: 12,
    textAlign: 'center',
  },
};
