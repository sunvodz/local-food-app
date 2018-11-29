import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

import { Card, Link } from 'app/components';
import { trans, priceHelper, unitHelper } from 'app/shared';
import globalStyle from 'app/styles';

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

    let currency = producer.currency;
    if (!currency || currency === 'null') {
      currency = '';
    }

    let packageUnit = unitHelper.getPackageUnit(product, variant, this.props.lang);

    let productName = <Text numberOfLines={2} style={styles.productName}>{cartItem.product.name}</Text>;
    let variantName = null;
    let productPrice = priceHelper.getPriceFormatted(product, null, currency);
    let totalPrice = priceHelper.getCalculatedPriceFormatted(product, null, data.quantity, currency, true);

    if (variant) {
      packageUnit = unitHelper.getPackageUnit(product, variant, this.props.lang);

      variantName = <Text style={styles.productName} numberOfLines={1}>{variant.name}</Text>;
      productPrice = priceHelper.getPriceFormatted(product, variant, currency);
      totalPrice = priceHelper.getCalculatedPriceFormatted(product, variant, data.quantity, currency, true);
    }

    if (packageUnit) {
      packageUnit = <Text numberOfLines={1} style={styles.packageUnitText}>{packageUnit}</Text>;
    }

    let quantity = (
      <View style={quantityStyle.quantity}>
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
            <Icon name='plus-circle' style={quantityStyle.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );

    let trash = (
      <View style={styles.footer}>
        <View style={styles.priceWrapper}>
          <Text style={styles.priceText}>{trans('price_to_pay', this.props.lang)}: {totalPrice}</Text>
        </View>
        <Link title={trans('delete', this.props.lang)} onPress={this.removeCartItem.bind(this)} />
      </View>
    );

    return (
      <View>
        <Card key={data.ref} footer={trash} style={styles.card}>
          {productName}
          {variantName}
          {packageUnit}

          <View style={styles.row}>
            <View style={[styles.priceWrapper, {marginVertical: 10}]}>
              <Text style={styles.priceText}>{productPrice}</Text>
            </View>
          </View>

          <View style={styles.producerNodeWrapper}>
            <Text style={styles.producer}>{cartItem.producer.name} - {cartItem.node.name}</Text>
          </View>

          <View style={styles.row}>
            {quantity}
          </View>
        </Card>
      </View>
    );
  }
}

let styles = {
  card: {
    card: {
      marginBottom: 0
    }
  },
  productName: {
    fontFamily: 'montserrat-semibold',
  },
  producerNodeWrapper: {
    flex: 1,
    flexDirection: 'row',
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
  footer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceWrapper: {
    backgroundColor: globalStyle.primaryColor,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  priceText: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  }
}

const quantityStyle = {
  quantity: {
    backgroundColor: '#fff',
    borderColor: '#e4e4e0',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  variantName: {
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
};
