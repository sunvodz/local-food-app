import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import globalStyle from 'app/styles';

import { trans, priceHelper, unitHelper } from 'app/shared';

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

    // Allow increase if product doesn't use stock or if new quantity is less or equal
    // to what's available
    if (!this.props.product.has_stock || newQuantity <= availableQuantity) {
      this.setState({quantity: newQuantity});
      this.props.onQuantityChange({quantity: newQuantity});
    }
  }

  render() {
    const { product, variant } = this.props;

    const producer = product.producer;

    let packageUnit = unitHelper.getPackageUnit(product, null, this.props.lang);

    let productName = product.name;
    let productPrice = priceHelper.getPriceFormatted(product, variant, producer.currency);
    let availableQuantity = product.available_quantity;

    if (variant) {
      packageUnit = unitHelper.getPackageUnit(product, variant, this.props.lang);

      productName = variant.name;
      productPrice = priceHelper.getPriceFormatted(product, variant, producer.currency);
      totalPrice = priceHelper.getCalculatedPriceFormatted(product, variant, this.state.quantity, producer.currency);
      availableQuantity = variant.available_quantity;
    }

    let packageUnitBadge = null;
    if (packageUnit) {
      packageUnitBadge = <View style={styles.priceItem}><Text numberOfLines={1} style={styles.priceText}>{packageUnit}</Text></View>;
    }

    let quantityForm = null;

    if (this.props.auth.user && this.props.auth.user.active && this.props.auth.user.membership_payments.length > 0) {
      // Always show order form if product doesn't use stock.
      if (!product.has_stock || parseInt(availableQuantity) > 0) {
        let availableText = `${this.state.quantity}/${availableQuantity}`;
        if (!product.has_stock) {
          availableText = this.state.quantity;
        }

        quantityForm = (
          <View style={styles.quantity}>
            <TouchableOpacity style={styles.decrease} onPress={this.onDecrease.bind(this)}>
              <Icon name='minus-circle' style={styles.icon}  />
            </TouchableOpacity>
            <View style={styles.buttonWrapper}>
              <View style={styles.button}>
                <Text numberOfLines={1} style={styles.buttonText}>{availableText}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.increase} onPress={this.onIncrease.bind(this)}>
              <Icon name='plus-circle' style={styles.icon} />
            </TouchableOpacity>
          </View>
        );
      } else {
        quantityForm = <Text style={styles.soldout}>{trans('Sold out', this.props.lang)}</Text>;
      }
    }

    let productPriceItem = (
      <View style={styles.priceItem}>
        <Text numberOfLines={1} style={styles.priceText}>{productPrice}</Text>
      </View>
    );

    return (
      <View style={styles.view}>
        <View style={styles.priceView}>
          <View>
            <Text numberOfLines={1} style={styles.productName}>{productName}</Text>
          </View>
          <View style={styles.priceRow}>
            {productPriceItem}
            {packageUnitBadge}
          </View>
        </View>
        <View style={styles.orderFormRow}>
          {quantityForm}
        </View>
      </View>
    );
  }
}

let styles = {
  view: {
    backgroundColor: '#fff',
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
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  priceView: {
    paddingHorizontal: 15,
  },
  productName: {
    fontFamily: 'montserrat-semibold',
    marginTop: 10,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoIcon: {
    width: 20,
  },
  infoText: {
    fontFamily: 'montserrat-regular',
  },
  priceItem: {
    backgroundColor: globalStyle.primaryColor,
    borderRadius: 15,
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  priceText: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
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
    backgroundColor: globalStyle.primaryColor,
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
  soldout: {
    color: globalStyle.primaryColor,
    flex: 1,
    fontFamily: 'montserrat-semibold',
    marginTop: 15,
    textAlign: 'center',
  }
};