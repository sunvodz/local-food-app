import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import _ from 'lodash';

import { Card, Text, Picker } from 'app/components';

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

    let increaseProps = {
      name: 'plus-circle',
      style: styles.icon,
      size: 24,
      onPress: this.onIncrease.bind(this),
    };

    let decreaseProps = {
      name: 'minus-circle',
      style: styles.icon,
      size: 24,
      onPress: this.onDecrease.bind(this),
    };

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
            <View style={quantityStyle.decrease}>
              <Icon {...decreaseProps} />
            </View>
            <View style={quantityStyle.buttonWrapper}>
              <View style={quantityStyle.button}>
                <Text style={quantityStyle.buttonText}>{data.quantity}</Text>
              </View>
            </View>
            <View style={quantityStyle.increase}>
              <Icon {...increaseProps} />
            </View>
          </View>
      </View>
    );

    let trash = (
      <View style={styles.trash}>
        <Icon style={styles.trashIcon} name='trash' size={24} onPress={this.removeCartItem.bind(this)} />
      </View>
    );

    return (
      <View style={styles.wrapper} key={data.ref}>
        <View>
          <Text numberOfLines={1} style={styles.productName}>{cartItem.product.name.toUpperCase()}</Text>
          {variantName}
          <View style={styles.producerNodeWrapper}>
            <Text style={styles.producer}>{cartItem.producer.name} - {cartItem.node.name}</Text>
          </View>

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
          {trash}
        </View>
      </View>
    );
  }
}

const styles = {
  wrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f0',
    marginHorizontal: 15,
    padding: 15,
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
  trash: {
    flex: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  trashIcon: {
    color: '#333',
    alignSelf: 'center',
  },
  quantity: {
    flex: 10,
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
  priceView: {
    paddingHorizontal: 15,
    paddingVertical: 5,
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
  buttonWrapper: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#bc3b1f',
    borderRadius: 100,
    padding: 15,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
    width: 20,
    height: 20,
  },
};