import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import { Loader, List, ListSection, ListItem, Empty } from 'app/components';
import * as actions from './actions';
import { trans } from 'app/shared';

// const DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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

  onRefresh() {
    this.props.dispatch(actions.fetchOrders());
  }

  navigateOrder(orderDateItemLinkId) {
    console.log(this.props);
    
    const { navigate } = this.props.navigation;

    navigate('Order', orderDateItemLinkId);
  }

  renderListSection(o, sectionId, rowId) {
    orders = o.item;
    let dateObj = moment(orders.key);
    let date = dateObj.format('DD') + ' ' + trans(dateObj.format('MMMM'), this.props.lang) + ' ' + dateObj.format('YYYY');
    let numberOfListItems = orders.items.length - 1;

    let listItems = _.map(orders.items, (order, index) => {
      let orderItem = order.order_item_relationship[0];
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
      <ListSection label={trans('pickup', this.props.lang) + ' ' + date}>
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
      return <Empty onRefresh={this.onRefresh.bind(this)} refreshing={refreshing} icon="list" header={trans('no_orders', this.props.lang)} text={trans('no_orders_text', this.props.lang)} />;
    }

    let listProps = {
      // dataSource: DataSource.cloneWithRows(orders),
      data: orders,
      renderItem: this.renderListSection.bind(this),
      onRefresh: this.onRefresh.bind(this),
      refreshing: refreshing,
    }

    return <List {...listProps} />;
  }
}

function mapStateToProps(state) {
  const { orders } = state;

  return {
    orders,
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
