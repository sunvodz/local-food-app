import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

    if (newQuantity <= availableQuantity) {
      this.setState({quantity: newQuantity});
      this.props.onQuantityChange({quantity: newQuantity});
    }
  }

  navigateToSignIn() {
    this.props.navigateToSignIn();
  }

  // getPackageUnit(product, variant) {
  //   let packageUnit = null;
  //   let packageAmount = product.package_amount;

  //   if (variant) {
  //     packageAmount = variant.package_amount;
  //   }

  //   if (unitHelper.isWeightUnit(product.package_unit)) {
  //     packageUnit = <Text numberOfLines={1} style={styles.packageUnitText}>{`ca ${packageAmount} ${trans('unit_' + product.package_unit, this.props.lang)}`}</Text>;
  //   } else if (packageAmount > 1) {
  //     packageUnit = <Text numberOfLines={1} style={styles.packageUnitText}>{`${packageAmount} ${trans('unit_' + product.package_unit, this.props.lang)}`}</Text>;
  //   }

  //   return packageUnit;
  // }

  render() {
    const { product, variant } = this.props;
    const producer = product.producer_relationship;

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

    if (packageUnit) {
      packageUnit = <Text numberOfLines={1} style={styles.packageUnitText}>{packageUnit}</Text>;
    }

    let quantityForm = null;

    if (this.props.auth.user && this.props.auth.user.active) {
      // If logged in and a member - orders are possible
      if (parseInt(availableQuantity) > 0) {
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
      } else {
        quantityForm = <Text style={styles.soldout}>{trans('sold_out', this.props.lang)}</Text>;
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
            {packageUnit}
          </View>
          <View style={styles.priceRow}>
            {productPriceItem}
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
    backgroundColor: '#fff2de',
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
  productName: {
    fontFamily: 'montserrat-semibold',
    marginBottom: 5,
  },
  packageUnitText: {
    fontFamily: 'montserrat-regular',
    marginTop: -5,
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: '#bc3b1f',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  priceText: {
    color: '#fff',
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
  soldout: {
    color: '#bc3b1f',
    flex: 1,
    fontFamily: 'montserrat-semibold',
    textAlign: 'center',
  }
};