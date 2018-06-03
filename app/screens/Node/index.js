import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import _ from 'lodash';

import { Loader, NumberInput, Button, Empty, ScreenHeader } from 'app/components';
import DatePicker from './component/DatePicker';
import ProductCard from './component/ProductCard';
import * as actions from './actions';
import { trans } from 'app/shared';

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      refreshing: false,
    };

    this.renderProduct = this.renderProduct.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.node, this.props.node) || !_.isEqual(nextProps.auth, this.props.auth);
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

  addToCart(data) {
    let selectedDate = this.getSelectedDate();

    data.node_id = this.props.node.node.id;
    data.delivery_dates = selectedDate ? [selectedDate] : [];

    this.props.dispatch(actions.addProductToCart(data));
  }

  navigateToSignIn() {
    this.props.navigation.navigate('UserStackNavigation');
  }

  renderProduct(product, rowId) {
    let image = null; // Fallback here
    if (product.image_relationship && product.image_relationship.length > 0) {
      image = product.image_relationship[0].urls.medium;
    }

    return <ProductCard key={product.id} product={product} image={image} auth={this.props.auth} addToCart={this.addToCart.bind(this)} navigateToSignIn={this.navigateToSignIn.bind(this)} />;
  }

  render() {
    const { products, loadingProducts, dates, node } = this.props.node;

    if (!loadingProducts && (!products || products.length === 0)) {
      return (
        <View style={styles.view}>
          <Empty icon="exclamation" header={trans('no_products', this.props.lang)} text={trans('no_products_text', this.props.lang)} />
        </View>
      );
    }

    let content = (
      <View style={{flex: 1}}>
        <Loader />
      </View>
    );

    if (!loadingProducts) {
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
    if (this.props.auth.user && !this.props.auth.user.active) {
      // If logged in but not a member - orders not possible
      userNoticeMessage = <Text style={styles.userNoticeMessage}>You need an active membership to order products</Text>;
    } else if (!this.props.auth.user) {
      // If not logged in
      userNoticeMessage = <Text style={styles.userNoticeMessage}>Please login to order products</Text>;
    }

    userNotice = (
      <View style={styles.userNotice}>
        {userNoticeMessage}
      </View>
    );

    return (
      <View style={styles.view}>
        <ScreenHeader title={this.props.navigation.state.params.name} left right navigation={this.props.navigation} />
        <DatePicker dates={dates} onSelectDate={this.onSelectDate.bind(this)} selectedDate={this.getSelectedDate()} lang={this.props.lang} />
        {content}
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

const styles = {
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
    flex: 1,
    backgroundColor: '#bc3b1f',
    position: 'absolute',
    bottom: 0,
    padding: 15,
  },
  userNoticeMessage: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
  }
};