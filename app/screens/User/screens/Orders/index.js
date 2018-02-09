import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, RefreshControl, ListView } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import { ContentWrapper, Card, Loader, List, ListSection, ListItem, Text} from 'app/components';
import * as actions from './actions';

const br = '\n';
const DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      refreshing: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.orders, this.props.orders);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchOrders());
  }

  onRefresh() {
    this.props.dispatch(actions.fetchOrders());
  }

  navigateOrder(orderData) {
    const { navigate } = this.props.userStackNavigation.navigation;
    navigate('OrderDetails', orderData);
  }

  renderListSection(orders, sectionId, rowId) {
    let date = moment(orders[0].date.date.date).format('YYYY-MM-DD');
    let numberOfListItems = orders.length - 1;

    let listItems = _.map(orders, (order, index) => {
      let orderItem = order.order_item_relationship[0];
      let isLastListItem = index === numberOfListItems;

      return (
        <ListItem key={order.id} onPress={this.navigateOrder.bind(this, order)} last={isLastListItem}>
          <View>
            <Text>{orderItem.product.name.toUpperCase()} {br}</Text>
            <Text style={{color: '#b4b4b0'}}>{orderItem.node.name}</Text>
          </View>
        </ListItem>
      );
    });

    return (
      <ListSection label={date}>
        {listItems}
      </ListSection>
    );
  }

  render() {
    const  { loading, refreshing, orders } = this.props.orders;

    if (loading || _.isEmpty(orders)) {
      return <Loader />;
    }

    let listProps = {
      dataSource: DataSource.cloneWithRows(orders),
      renderRow: this.renderListSection.bind(this),
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

export default connect(mapStateToProps)(Orders);
