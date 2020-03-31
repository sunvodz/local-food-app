import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import { Loader, List, ListSection, ListItem, Empty } from 'app/components';
import * as actions from './actions';
import { trans } from 'app/shared';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      refreshing: false,
    }
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchOrders());
  }

  componentDidUpdate() {
    if (this.props.orders.reloadOrders) {
      this.props.dispatch(actions.fetchOrders());
    }
  }

  onRefresh() {
    this.props.dispatch(actions.fetchOrders());
  }

  navigateOrder(orderDateItemLinkId) {
    const { navigate } = this.props.navigation;

    navigate('order', orderDateItemLinkId);
  }

  renderListSection(o, sectionId, rowId) {
    orders = o.item;
    let dateObj = moment(orders.key);
    let date = dateObj.format('DD') + ' ' + trans(dateObj.format('MMMM'), this.props.lang) + ' ' + dateObj.format('YYYY');
    let numberOfListItems = orders.items.length - 1;

    let listItems = _.map(orders.items, (order, index) => {
      let orderItem = order.item;
      let isLastListItem = index === numberOfListItems;

      return (
        <ListItem key={order.id} onPress={this.navigateOrder.bind(this, order.id)} last={isLastListItem}>
          <View>
            <Text style={styles.listItemTitle}>{orderItem.product.name}</Text>
            <Text style={styles.listItemText}>{orderItem.node.name}</Text>
          </View>
        </ListItem>
      );
    });

    return (
      <ListSection label={trans('Pickup', this.props.lang) + ' ' + date}>
        {listItems}
      </ListSection>
    );
  }

  render() {
    const  { loading, refreshing, orders } = this.props.orders;

    if (loading) {
      return <Loader />;
    }

    if (_.isEmpty(orders)) {
      return <Empty onRefresh={this.onRefresh.bind(this)} refreshing={refreshing} icon="list" header={trans('No orders', this.props.lang)} text={trans('You have no orders. Visit a node to find available products.', this.props.lang)} />;
    }

    let listProps = {
      data: orders,
      renderItem: this.renderListSection.bind(this),
      onRefresh: this.onRefresh.bind(this),
      refreshing: refreshing,
    }

    return <List {...listProps} />;
  }
}

function mapStateToProps(state) {
  const { orders, auth } = state;

  return {
    orders,
    auth,
  }
}

let styles = {
  listItemTitle: {
    fontFamily: 'montserrat-semibold',
  },
  listItemText: {
    fontFamily: 'montserrat-regular',
  }
};

export default connect(mapStateToProps)(Orders);
