import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import _ from 'lodash';

import { Loader, Button, Empty, ScreenHeader } from 'app/components';
import DatePicker from './component/DatePicker';
import ProductCard from './component/ProductCard';
import * as actions from './actions';
import { trans, priceHelper } from 'app/shared';
import globalStyle from 'app/styles';

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      refreshing: false,
      addToCart: null,
    };

    this.renderProduct = this.renderProduct.bind(this);
  }

  componentDidMount() {
    const node = this.props.navigation.state.params;

    this.props.dispatch(actions.fetchNode(node.id));
    this.props.dispatch(actions.fetchNodeDates(node.id));
    this.props.dispatch(actions.addNodeToUser(node.id));
  }

  componentWillUnmount() {
    this.props.dispatch(actions.resetNode());
  }

  componentDidUpdate(prevProps, prevState) {
    const node = this.props.navigation.state.params;
    const prevFilters = _.get(prevProps, 'node.filters');
    const filters = this.props.node.filters;

    if (filters.date && filters.date !== prevFilters.date) {
      this.props.dispatch(actions.fetchProducts({
        date: filters.date,
        node: node.id,
      }));
    }
  }

  onSelectDate(date) {
    let selectedDate = this.getSelectedDate();

    if (date !== selectedDate) {
      this.props.dispatch(actions.setDateFilter(date));
    }
  }

  getSelectedDate() {
    return _.get(this.props.node, 'filters.date');
  }

  onQuantityChange(data) {
    if (data.quantity === 0) {
      this.resetCart();
    } else {
      let selectedDate = this.getSelectedDate();

      data.node_id = this.props.node.node.id;
      data.delivery_dates = selectedDate ? [selectedDate] : [];

      this.setState({addToCart: data});
    }
  }

  addToCart() {
    this.props.dispatch(actions.addProductToCart(this.state.addToCart));
    this.resetCart();
  }

  resetCart() {
    this.setState({addToCart: null});
  }

  navigateToAuth() {
    this.props.navigation.navigate('Auth', {
      auth: this.props.auth,
      navBackIcon: true,
    });
  }

  navigateToMembership() {
    this.props.navigation.navigate('Membership', {
      auth: this.props.auth,
      navBackIcon: true,
    });
  }

  renderProduct(product, rowId) {
    let image = null; // Fallback here
    if (product.image_relationship && product.image_relationship.length > 0) {
      image = product.image_relationship[0].urls.medium;
    }

    return <ProductCard key={product.id} product={product} image={image} auth={this.props.auth} onQuantityChange={this.onQuantityChange.bind(this)} lang={this.props.lang} />;
  }

  render() {
    const { products, loadingProducts, loadingDates, dates } = this.props.node;

    if (!loadingDates && (!dates || dates.length === 0)) {
      return (
        <View style={styles.view}>
          <ScreenHeader title={this.props.navigation.state.params.name} left right navigation={this.props.navigation} />
          <Empty icon="exclamation" header={trans('no_delivery_dates', this.props.lang)} text={trans('no_delivery_dates_text', this.props.lang)} />
        </View>
      );
    }

    let content = (
      <View style={styles.view}>
        <Loader />
      </View>
    );

    if (!loadingProducts && (!products || products.length === 0)) {
      content = (
        <View style={styles.view}>
          <Empty icon="exclamation" header={trans('no_products', this.props.lang)} text={trans('no_products_text', this.props.lang)} />
        </View>
      );
    } else if (!loadingProducts && (products || products.length > 0)) {
      productCards = _.map(products, (product, index) => {
        return this.renderProduct(product, index);
      });

      content = (
        <ScrollView >
          {productCards}
        </ScrollView>
      );
    }

    let userNotice = null;
    let userNoticeMessage = null;
    if (this.props.auth.user && this.props.auth.user.membership_payments_relationship.length === 0) {
      // If logged in but not a member
      userNoticeMessage = (
        <View>
          <Button onPress={this.navigateToMembership.bind(this)} title="Become a member to order" />
        </View>
      );
    } if (this.props.auth.user && !this.props.auth.user.active) {
      // If logged in but not active
      userNoticeMessage = (
        <View>
          <Text style={styles.userNoticeMessage}>{trans('user_not_active', this.props.lang)}</Text>
          <Button onPress={this.navigateToMembership.bind(this)} title="Activate your account" />
        </View>
      );
    } else if (!this.props.auth.user) {
      // If not logged in
      userNoticeMessage = (
        <View>
          <Button onPress={this.navigateToAuth.bind(this)} title="Login or create account" />
        </View>
      );
    }

    if (userNoticeMessage) {
      userNotice = (
        <View style={styles.userNotice}>
          {userNoticeMessage}
        </View>
      );
    }

    let addToCartNotice = null;
    if (this.state.addToCart) {
      let addToCart = this.state.addToCart;
      let totalPrice = priceHelper.getCalculatedPriceFormatted(addToCart.product, addToCart.variant, addToCart.quantity, addToCart.producer.currency, true);

      addToCartNotice = (
        <View style={styles.addToCartWrapper}>
          <View style={styles.addToCartInfoWrapper}>
            <Text numberOfLines={1} style={styles.addToCartText}>{addToCart.quantity} x {addToCart.product.name}</Text>
            <Text numberOfLines={1} style={styles.priceText}>{totalPrice}</Text>
          </View>
          <View style={styles.addToCartActionWrapper}>
            <Button icon='shopping-basket' title={trans('add', this.props.lang)} onPress={this.addToCart.bind(this)} />
            <Text style={styles.addToCartReset} onPress={this.resetCart.bind(this)}>{trans('reset', this.props.lang)}</Text>
          </View>
        </View>
      );
    }

    let subTitle = trans('loading_products', this.props.lang);
    if (products && products.length > 0) {
      subTitle = products.length + ' ' + trans('products_for_sale', this.props.lang);
    }

    return (
      <View style={styles.view}>
        <ScreenHeader title={this.props.navigation.state.params.name} sub={subTitle} left right navigation={this.props.navigation} />
        <DatePicker dates={dates} onSelectDate={this.onSelectDate.bind(this)} selectedDate={this.getSelectedDate()} lang={this.props.lang} />
        {content}
        {addToCartNotice}
        {userNotice}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth, node } = state;

  return {
    auth,
    node,
  }
}

export default connect(mapStateToProps)(Node);

let styles = {
  view: {
    backgroundColor: '#fff',
    flex: 1,
  },
  productWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 15,
  },
  userNotice: {
    backgroundColor: globalStyle.primaryColor,
    bottom: 0,
    padding: 15,
    position: 'absolute',
    width: '100%',
  },
  userNoticeMessage: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    marginBottom: 15,
  },
  addToCartWrapper: {
    backgroundColor: globalStyle.primaryColor,
    bottom: 0,
    flexDirection: 'row',
    padding: 15,
    position: 'absolute',
    width: '100%',
  },
  addToCartInfoWrapper: {
    flex: 1,
  },
  addToCartText: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
  },
  priceText: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  },
  addToCartActionWrapper: {
    alignItems: 'center',
    flex: 1,
    marginLeft: 15,
  },
  addToCartButton: {
    flex: 1,
    button: {
      backgroundColor: '#ff9800',
    },
    title: {
      color: '#333',
    },
    icon: {
      color: '#333',
    }
  },
  addToCartReset: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    marginTop: 5,
    textDecorationLine: 'underline',
  }
};