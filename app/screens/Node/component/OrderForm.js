import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { Button, Link, QuantityInput } from 'app/components';

export default class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 0,
    }
  }

  onDecrease() {
    let newQuantity = parseInt(this.state.quantity) - 1;

    if (newQuantity >= 0) {
      this.setState({quantity: newQuantity});
    }
  }

  onIncrease() {
    let newQuantity = parseInt(this.state.quantity) + 1;
    this.setState({quantity: newQuantity});
  }

  addToCart() {
    this.props.addToCart({
      quantity: this.state.quantity,
    });
  }

  navigateToSignIn() {
    this.props.navigateToSignIn();
  }

  render() {
    const { auth, product, variant } = this.props;
    const producer = product.producer_relationship;

    let orderForm = (
      <View style={styles.quantity}>
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Icon name='user' size={20} color='#fff' style={styles.buttonIcon} onPress={this.navigateToSignIn.bind(this)} />
          </View>
          <Text style={styles.buttonText}>Login to shop</Text>
        </View>
      </View>
    );

    let productUnitString = null;
    if (product.package_unit && product.package_unit !== 'product') {
      productUnitString = `/${product.package_unit}`;
    }

    let variantName = <Text numberOfLines={1} style={styles.variantName}>{product.name}</Text>;
    let totalPrice = this.state.quantity * product.price;
    let productPrice = <Text numberOfLines={1} style={styles.price}>{product.price} {producer.currency}{productUnitString}</Text>;
    let available_quantity = product.available_quantity;

    if (variant) {
      variantName = <Text numberOfLines={1} style={styles.variantName}>{variant.name}</Text>;
      totalPrice = this.state.quantity * variant.price;
      productPrice = <Text numberOfLines={1} style={styles.price}>{variant.price} {producer.currency}{productUnitString}</Text>;
      available_quantity = variant.available_quantity;
    }

    let summaryPriceItem = null;

    // Need to become member first
    if (this.props.auth.user && this.props.auth.user.active) {
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

      if (this.props.disabled) {
        orderForm = (
          <View style={styles.quantity}>
            <View style={styles.buttonWrapper}>
              <View style={styles.button}>
                <Icon name='warning' size={20} color='#fff' style={styles.buttonIcon} />
              </View>
              <Text style={styles.buttonText}>Select pick up date</Text>
            </View>
          </View>
        );
      }

      if (!this.props.disabled && this.state.quantity >= 0) {
        let buyText = null;
        if (this.state.quantity > 0) {
          buyText = <Text numberOfLines={2} style={styles.buttonBuyText}><Icon name='hand-pointer-o'/> Buy</Text>;
        }

        orderForm = (
          <View style={styles.quantity}>
            <View style={styles.decrease}>
              <Icon {...decreaseProps} />
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button} onPress={this.addToCart.bind(this)}>
                <Text numberOfLines={1} style={styles.buttonText}>{this.state.quantity}/{available_quantity}</Text>
                {buyText}
              </TouchableOpacity>
            </View>
            <View style={styles.increase}>
              <Icon {...increaseProps} />
            </View>
          </View>
        );
      }

      summaryPriceItem = (
        <View style={styles.priceItem}>
          <Text numberOfLines={1} style={styles.price}>{totalPrice} {producer.currency}</Text>
          <Icon style={[styles.priceIcon, {marginLeft: 5}]} name='shopping-basket' size={16} color='#bc3b1f' />
        </View>
      );
    }

    let productPriceItem = (
      <View style={styles.priceItem}>
        <Icon style={[styles.priceIcon, {marginRight: 5}]} name='tag' size={16} color='#bc3b1f' />
        {productPrice}
      </View>
    );

    return (
      <View style={styles.view}>
        <View style={styles.priceView}>
          {variantName}
          <View style={styles.priceRow}>
            {productPriceItem}
            {summaryPriceItem}
          </View>
        </View>
        <View style={styles.orderFormRow}>
          {orderForm}
        </View>
      </View>
    );
  }
}

const styles = {
  view: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#f4f4f0',
    paddingBottom: 15,
  },
  signin: {
    fontFamily: 'montserrat-regular',
    padding: 15,
    textAlign: 'right',
    flex: 1,
  },
  orderFormRow: {
    flexDirection: 'row',
  },
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
  priceIcon: {

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
    justifyContent: 'center',
    backgroundColor: '#bc3b1f',
    borderRadius: 100,
    padding: 15,
    width: 75,
    height: 75,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    fontSize: 12,
    textAlign: 'center',
  },
  buttonBuyText: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
};