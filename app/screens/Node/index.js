import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import _ from 'lodash';
import { FontAwesome as Icon } from '@expo/vector-icons';

import { Loader, Button, Empty } from 'app/components';
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
      scrollLoadingDisabled: false,
    };

    this.renderProduct = this.renderProduct.bind(this);
    this.toggleFollowNode = this.toggleFollowNode.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
  }

  componentDidMount() {
    const node = this.props.route.params.node;

    this.props.navigation.setOptions({ title: node.name });
    this.props.dispatch(actions.fetchNode(node.id));
    this.props.dispatch(actions.fetchNodeDates(node.id, this.props.system.lang));
  }

  componentWillUnmount() {
    this.props.dispatch(actions.resetNode());
  }

  componentDidUpdate(prevProps, prevState) {
    const node = this.props.route.params.node;
    const prevFilters = _.get(prevProps, 'node.filters');
    const prevProducts = _.get(prevProps, 'node.products');
    const filters = this.props.node.filters;

    if ((this.props.node.products && prevProducts && this.props.node.products.length !== prevProducts.length)) {
      this.setState({
        scrollLoadingDisabled: false
      });
    }

    if (filters.date && filters.date !== prevFilters.date) {
      this.fetchProducts(node.id, filters.date, true);
      this.props.dispatch(actions.fetchProductsCount({
        node: node.id,
        date: filters.date
      }));
    }

    let isActive = this.props.auth.user.node_links.find(nodeLink => {
      return nodeLink.node_id == node.id;
    });

    let icon = isActive ? 'heart' : 'heart-o';
    this.props.navigation.setOptions({
      headerRight: () => (
        <Icon style={{marginRight: 15}} name={icon} size={16} color='#fff' onPress={this.toggleFollowNode.bind(this)} />
      ),
    });

  }

  fetchProducts(nodeId, dateFilter, ignoreScrollLoading = false) {
    if (this.state.scrollLoadingDisabled === false || ignoreScrollLoading) {

      this.setState({
        scrollLoadingDisabled: true // This is to avoid sending multiple request when lazy loading products
      });

      let productsToIgnore = [];
      if (this.props.node.products) {
        productsToIgnore = this.props.node.products.map(product => {
          return product.id;
        });
      }

      this.props.dispatch(actions.fetchProducts({
          date: dateFilter,
          node: nodeId,
          products_to_ignore: productsToIgnore
        },
        this.props.system.lang
      ));
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
    this.props.dispatch(actions.addProductToCart(this.state.addToCart, this.props.system.lang));
    this.resetCart();
  }

  resetCart() {
    this.setState({addToCart: null});
  }

  navigateToPaymentSelect() {
    this.props.navigation.navigate('PaymentSelect', {
      auth: this.props.auth,
      navBackIcon: true,
    });
  }

  navigateToSettings() {
    this.props.navigation.navigate('UserStackNavigation', {
      screen: 'Settings',
    });
  }

  renderProduct(product, rowId) {
    let image = null; // Fallback here
    if (product.images && product.images.length > 0) {
      image = product.images[0].urls.medium;
    }

    return <ProductCard key={product.id} product={product} image={image} auth={this.props.auth} onQuantityChange={this.onQuantityChange.bind(this)} lang={this.props.system.lang} />;
  }

  toggleFollowNode() {
    let nodeId = this.props.node.node.id;
    this.props.dispatch(actions.toggleFollowNode(nodeId, this.props.system.lang));
  }

  loadMore() {
    if (!this.props.node.loadingProducts) {
      this.fetchProducts(this.props.node.node.id, this.props.node.filters.date);
    }
  }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  render() {
    const { products, loadingProducts, dates } = this.props.node;
    const lang = this.props.system.lang;

    // Show loader when loading node
    if (this.props.node.loadingNode === undefined || this.props.node.loadingNode || !this.props.node.node) {
      return (
        <View style={styles.view}>
          <Loader />
        </View>
      );
    }

    // Show empty screen if node doesn't have any dates
    if (!this.props.node.loadingDates && (!dates || dates.length === 0)) {
      return (
        <View style={styles.view}>
          <Empty icon="exclamation" header={trans('No delivery dates')} text={trans('There are no available delivery dates available for this node.', lang)} />
        </View>
      );
    }

    let content = null;

    // Show empty screen if there are no products
    if (!loadingProducts && (!products || products.length === 0)) {
      content = (
        <View style={styles.view}>
          <Empty icon="exclamation" header={trans('No products', lang)} text={trans('No available products at the moment.', lang)} />
        </View>
      );
    } else {
      // Scroll view with products
      if (products && products.length > 0) {
        let productCards = products.map((product, index) => {
          return this.renderProduct(product, index);
        });

        let loader = null;
        if (this.props.node.productsCount > products.length) {
          let loaderContent = (
            <Text style={{fontFamily: 'montserrat-regular', textAlign: 'center'}}>
              {trans('Scroll to load more products', lang)}
            </Text>
          );

          if (loadingProducts) {
            loaderContent = <ActivityIndicator color="#333" />
          }

          loader = <View style={{paddingVertical: 15}}>{loaderContent}</View>
        }

        content = (
          <ScrollView scrollEventThrottle={1} onScroll={({ nativeEvent }) => {
              if (this.isCloseToBottom(nativeEvent)) {
                this.loadMore();
              }
            }}
          >
            {productCards}
            {loader}
          </ScrollView>
        );
      } else {
        // Initial product load - standard view
        content = (
          <View style={{flex: 1}}>
            <Loader />
          </View>
        );
      }
    }

    let userNotice = null;
    let userNoticeMessage = null;
    if (this.props.auth.user && this.props.auth.user.membership_payments.length === 0) {
      // If logged in but not a member
      userNoticeMessage = (
        <View>
          <Text style={styles.userNoticeMessage}>{trans('Before you can order you need to make a donation.', lang)}</Text>
          <Button onPress={this.navigateToPaymentSelect.bind(this)} title={trans('Make a donation', lang)} />
        </View>
      );
    } if (this.props.auth.user && !this.props.auth.user.active) {
      // If logged in but not active
      userNoticeMessage = (
        <View>
          <Text style={styles.userNoticeMessage}>{trans('Before you can order you need to verify your email address and make a donation.', lang)}</Text>
          <Button onPress={this.navigateToSettings.bind(this)} title={trans('Verify your email', lang)} />
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
            <Button icon='shopping-cart' title={trans('Add product', lang)} onPress={this.addToCart.bind(this)} />
            <Text style={styles.addToCartReset} onPress={this.resetCart.bind(this)}>{trans('Reset', lang)}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.view}>
        <DatePicker dates={dates} onSelectDate={this.onSelectDate.bind(this)} selectedDate={this.getSelectedDate()} lang={lang} />
        {content}
        {addToCartNotice}
        {userNotice}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth, node, system } = state;

  return {
    auth,
    node,
    system,
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
    backgroundColor: globalStyle.mainPrimaryColor,
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
    backgroundColor: globalStyle.mainPrimaryColor,
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
  },
};