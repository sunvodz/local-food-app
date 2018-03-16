import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { Button, Link, QuantityInput } from 'app/components';

export default class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
    }
  }

  onDecrease() {
    let newQuantity = parseInt(this.state.quantity) - 1;

    if (newQuantity > 0) {
      this.setState({quantity: newQuantity})
    }
  }

  onIncrease() {
    let newQuantity = parseInt(this.state.quantity) + 1;
    this.setState({quantity: newQuantity})
  }

  addToCart() {
    this.props.addToCart({
      quantity: this.state.quantity,
    });
  }

  render() {
    const { auth, product, variant } = this.props;
    const producer = product.producer_relationship;

    let orderForm = <Text style={styles.signin}>Sign in to shop</Text>;

    let productPrice = product.price;
    let totalPrice = this.state.quantity * product.price;
    let productUnitString = null;

    if (product.package_unit && product.package_unit !== 'product') {
      productUnitString = `/${product.package_unit}`;
    }

    if (variant) {
      productPrice = variant.price;
      totalPrice = this.state.quantity * variant.price;
    }

    let summary = null;

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

      orderForm = (
        <View style={styles.quantity}>
          <View style={styles.decrease}>
            <Icon {...decreaseProps} />
          </View>
          <View style={styles.buttonWrapper}>
            <View style={styles.button}>
              <Text style={styles.buttonNotification}>+{this.state.quantity}</Text>
              <Icon name='shopping-basket' size={20} color='#fff' style={styles.buttonIcon} onPress={this.addToCart.bind(this)} />
            </View>
            <Text style={styles.buttonText}>Add to cart</Text>
          </View>
          <View style={styles.increase}>
            <Icon {...increaseProps} />
          </View>
        </View>
      );

      summary = (
        <View style={styles.priceView}>
          <Text style={[styles.priceHeader, styles.alignRight]}>Total</Text>
          <Text style={styles.alignRight}>{totalPrice} {producer.currency}</Text>
        </View>
      );
    }

    return (
      <View style={styles.view}>
        <View style={styles.orderFormRow}>
          <View style={styles.priceView}>
            <Text style={styles.priceHeader}>Price</Text>
            <Text>{productPrice} {producer.currency}{productUnitString}</Text>
          </View>
          {orderForm}
          {summary}
        </View>
      </View>
    );
  }
}

const styles = {
  view: {
    borderBottomWidth: 1,
    borderColor: '#f4f4f0',
  },
  signin: {
    backgroundColor: '#fafafa',
    fontFamily: 'montserrat-regular',
    padding: 15,
    textAlign: 'right',
    flex: 1,
  },
  orderFormRow: {
    backgroundColor: '#fafafa',
    flexDirection: 'row',
  },
  quantity: {
    justifyContent: 'center',
    flex: 2,
    flexDirection: 'row',
  },
  priceView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  priceHeader: {
    fontFamily: 'montserrat-semibold',
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
    paddingTop: 8,
    paddingRight: 8,
    paddingLeft: 8,
  },
  buttonIcon: {
    backgroundColor: '#bc3b1f',
    borderRadius: 30,
    height: 40,
    lineHeight: 30,
    textAlign: 'center',
    width: 40,
  },
  buttonNotification: {
    backgroundColor: '#fff',
    borderRadius: 30,
    color: '#bf360c',
    elevation: 2,
    fontFamily: 'montserrat-semibold',
    fontSize: 12,
    height: 20,
    width: 20,
    textAlign: 'center',
    lineHeight: 17,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  buttonText: {
    fontFamily: 'montserrat-regular',
    marginTop: 3,
  },
  icon: {
    color: '#757575'
  }
};