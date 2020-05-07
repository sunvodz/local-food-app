import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList, Text, View } from 'react-native';
import _ from 'lodash';
import { FontAwesome as Icon } from '@expo/vector-icons';

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
      scrollLoadingDisabled: false,
    };

    this.renderProduct = this.renderProduct.bind(this);
    this.getFollowNodeIcon = this.getFollowNodeIcon.bind(this);
    this.toggleFollowNode = this.toggleFollowNode.bind(this);
    this.props.navigation.setParams({ title: props.navigation.state.params.name, subtitle: trans('Loading products', this.props.lang), count: 0})
    this.loadMore = this.loadMore.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
  }

  componentDidMount() {
    const node = this.props.navigation.state.params;

    this.props.dispatch(actions.fetchNode(node.id));
    this.props.dispatch(actions.fetchNodeDates(node.id));
  }

  componentWillUnmount() {
    this.props.dispatch(actions.resetNode());
  }

  componentDidUpdate(prevProps, prevState) {
    const node = this.props.navigation.state.params;
    const prevFilters = _.get(prevProps, 'node.filters');
    const prevProducts = _.get(prevProps, 'node.products');
    const filters = this.props.node.filters;

    if (this.props.node.products && prevProducts && this.props.node.products.length !== prevProducts.length) {
      this.setState({
        scrollLoadingDisabled: false
      });
    }

    if (filters.date && filters.date !== prevFilters.date) {
      this.fetchProducts(node.id, filters.date);
      this.props.dispatch(actions.fetchProductsCount({
        node: node.id,
        date: filters.date
      }));
    }
  }

  fetchProducts(nodeId, dateFilter) {
    if (this.state.scrollLoadingDisabled === false) {
      this.setState({
        scrollLoadingDisabled: true
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
        products_to_ignore: productsToIgnore,
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
    this.props.navigation.navigate('auth', {
      auth: this.props.auth,
      navBackIcon: true,
    });
  }

  navigateToMembership() {
    this.props.navigation.navigate('paymentSelect', {
      auth: this.props.auth,
      navBackIcon: true,
    });
  }

  navigateToSettings() {
    this.props.navigation.navigate('settings', {
      auth: this.props.auth,
      navBackIcon: true,
    });
  }

  renderProduct(product, rowId) {
    let image = null; // Fallback here
    if (product.images && product.images.length > 0) {
      image = product.images[0].urls.medium;
    }

    return <ProductCard key={product.id} product={product} image={image} auth={this.props.auth} onQuantityChange={this.onQuantityChange.bind(this)} lang={this.props.lang} />;
  }

  getFollowNodeIcon() {
    let nodeId = this.props.node.node.id;
    let isActive = this.props.auth.user.node_links.find(nodeLink => {
      return nodeLink.node_id == nodeId;
    });

    let icon = 'heart-o';
    if (isActive) {
      icon = 'heart';
    }

    return <Icon style={[styles.icon, {marginRight: 10}]} name={icon} size={16} color='#fff' onPress={this.toggleFollowNode}/>;
  }

  toggleFollowNode() {
    let nodeId = this.props.node.node.id;
    this.props.dispatch(actions.toggleFollowNode(nodeId));
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

    // Show loader when loading node
    if (this.props.node.loadingNode === undefined || this.props.node.loadingNode || !this.props.node.node) {
      return (
        <View style={styles.view}>
          <ScreenHeader title={this.props.navigation.state.params.name} left right sub="" navigation={this.props.navigation} />
          <Loader />
        </View>
      );
    }

    // Show empty screen if node doesn't have any dates
    if (!this.props.node.loadingDates && (!dates || dates.length === 0)) {
      return (
        <View style={styles.view}>
          <ScreenHeader title={this.props.navigation.state.params.name} left right followNode={this.getFollowNodeIcon()} navigation={this.props.navigation} />
          <Empty icon="exclamation" header={trans('No delivery dates', this.props.lang)} text={trans('There are no available delivery dates available for this node.', this.props.lang)} />
        </View>
      );
    }

    let content = <View></View>;

    // Show empty screen if there are no products
    if (!loadingProducts && (!products || products.length === 0)) {
      content = (
        <View style={styles.view}>
          <Empty icon="exclamation" header={trans('No products', this.props.lang)} text={trans('No available products at the moment.', this.props.lang)} />
        </View>
      );
    } else {
      // Scroll view with products
      if (products && products.length > 0) {
        productCards = _.map(products, (product, index) => {
          return this.renderProduct(product, index);
        });

        let loader = null;
        if (this.props.node.productsCount > products.length) {
          loader = <Text style={styles.loadingMore}>{trans('Scroll to load more products', this.props.lang)}</Text>;
          if (loadingProducts) {
            loader = <Text style={styles.loadingMore}>{trans('Loading products', this.props.lang)}</Text>;
          }
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
          <Text style={styles.userNoticeMessage}>{trans('Before you can order you need to make a donation.', this.props.lang)}</Text>
          <Button onPress={this.navigateToMembership.bind(this)} title={trans('Make a donation', this.props.lang)} />
        </View>
      );
    } if (this.props.auth.user && !this.props.auth.user.active) {
      // If logged in but not active
      userNoticeMessage = (
        <View>
          <Text style={styles.userNoticeMessage}>{trans('Before you can order you need to verify your email address and make a donation.', this.props.lang)}</Text>
          <Button onPress={this.navigateToSettings.bind(this)} title="Verify your email" />
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
            <Button icon='shopping-basket' title={trans('Add', this.props.lang)} onPress={this.addToCart.bind(this)} />
            <Text style={styles.addToCartReset} onPress={this.resetCart.bind(this)}>{trans('Reset', this.props.lang)}</Text>
          </View>
        </View>
      );
    }

    let subTitle = trans('Loading products', this.props.lang);
    if (this.props.node.productsCount > 0) {
      let productsForSale = trans('products for sale', this.props.lang);
      if (this.props.node.productsCount === 1) {
        productsForSale = trans('product for sale', this.props.lang)
      }
      subTitle = this.props.node.productsCount + ' ' + productsForSale;
    } else if (this.props.node.productsCount === 0) {
      subTitle = trans('No products for sale', this.props.lang);
    }

    return (
      <View style={styles.view}>
        <ScreenHeader title={this.props.navigation.state.params.name} sub={subTitle} left right followNode={this.getFollowNodeIcon()} navigation={this.props.navigation} />
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
  },
  loadingMore: {
    fontFamily: 'montserrat-regular',
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingVertical: 15,
  }
};