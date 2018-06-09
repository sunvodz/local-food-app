import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { trans } from 'app/shared';

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
      this.props.onQuantityChange({quantity: newQuantity});
    }
  }

  onIncrease() {
    let availableQuantity = this.props.product.available_quantity;
    if (this.props.variant) {
      availableQuantity = this.props.variant.available_quantity;
    }

    let newQuantity = parseInt(this.state.quantity) + 1;

    if (newQuantity <= availableQuantity) {
      this.setState({quantity: newQuantity});
      this.props.onQuantityChange({quantity: newQuantity});
    }
  }

  navigateToSignIn() {
    this.props.navigateToSignIn();
  }

  render() {
    const { auth, product, variant } = this.props;
    const producer = product.producer_relationship;

    let priceUnit = trans('unit_' + product.price_unit, this.props.lang);

    let productWeight = null;
    if (product.package_unit && product.package_unit !== 'product') {
      productWeight = <Text numberOfLines={1} style={styles.price}>{`ca ${product.package_amount} ${product.package_unit}`}</Text>;
    }

    let variantName = <Text numberOfLines={1} style={styles.variantName}>{product.name}</Text>;
    let totalPrice = this.state.quantity * product.price;
    let productPrice = <Text numberOfLines={1} style={styles.price}>{product.price} {producer.currency}/{priceUnit}</Text>;
    let availableQuantity = product.available_quantity;

    if (variant) {
      if (variant.package_unit && variant.package_unit !== 'product') {
        productWeight = <Text numberOfLines={1} style={styles.price}>{`ca ${variant.package_amount} ${product.package_unit}`}</Text>;
      }

      variantName = <Text numberOfLines={1} style={styles.variantName}>{variant.name}</Text>;
      totalPrice = this.state.quantity * variant.price;
      productPrice = <Text numberOfLines={1} style={styles.price}>{variant.price} {producer.currency}/{priceUnit}</Text>;
      availableQuantity = variant.available_quantity;
    }

    let summaryPriceItem = null;
    let quantityForm = null;

    if (this.props.auth.user && this.props.auth.user.active) {
      // If logged in and a member - orders are possible
      if (this.state.quantity >= 0) {
        quantityForm = (
          <View style={styles.quantity}>
            <TouchableOpacity style={styles.decrease} onPress={this.onDecrease.bind(this)}>
              <Icon name='minus-circle' style={styles.icon}  />
            </TouchableOpacity>
            <View style={styles.buttonWrapper}>
              <View style={styles.button}>
                <Text numberOfLines={1} style={styles.buttonText}>{this.state.quantity}/{availableQuantity}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.increase} onPress={this.onIncrease.bind(this)}>
              <Icon name='plus-circle' style={styles.icon} />
            </TouchableOpacity>
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

    let productWeightItem = null;
    if (productWeight) {
      productWeightItem = (
        <View style={styles.priceItem}>
          <Icon style={[styles.priceIcon, {marginRight: 5}]} name='balance-scale' size={16} color='#bc3b1f' />
          {productWeight}
        </View>
      );
    }

    return (
      <View style={styles.view}>
        <View style={styles.priceView}>
          {variantName}
          <View style={styles.priceRow}>
            <View>
              {productPriceItem}
              {productWeightItem}
            </View>
            {summaryPriceItem}
          </View>
        </View>
        <View style={styles.orderFormRow}>
          {quantityForm}
        </View>
      </View>
    );
  }
}

const styles = {
  view: {
    backgroundColor: '#f9eeeb',
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
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  priceIcon: {
    width: 20,
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
    fontSize: 30,
    color: '#333',
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