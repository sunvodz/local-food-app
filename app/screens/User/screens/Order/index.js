import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import moment from 'moment';

import { ContentWrapper, Card, Loader, Button } from 'app/components';
import * as actions from './actions';
import * as orderActions from '../Orders/actions';

class Order extends Component {
  componentDidUpdate() {
    if (this.props.order.deleted) {
      this.props.dispatch(actions.resetDelete());
      this.props.dispatch(orderActions.fetchOrders());

      // Navigate back
      this.props.navigation.goBack();
    }
  }

  getOrder() {
    return this.props.navigation.state.params || null;
  }

  isDeletable(orderItem, orderDate) {
    // If date is missing, fix for bad data
    if (!orderDate || !orderDate.date || !orderDate.date.date) {
      return true;
    }

    let productDeadline = moment();
    if (orderItem.product.deadline) {
        productDeadline.add(orderItem.product.deadline, 'days');
    }

    let orderDeliveryDate = moment(orderDate.date.date);
    interval = orderDeliveryDate.diff(productDeadline, 'days');

    return interval < 0 ? false : true;
  }

  deleteOrder(orderDateItemLinkId) {
    this.props.dispatch(actions.deleteOrder(orderDateItemLinkId));
  }

  render() {
    const order = this.getOrder();
    const orderItem = order.order_item_relationship[0];
    const orderDate = order.order_date_relationship[0];
    const isDeletable = this.isDeletable(orderItem, orderDate);

    if (!order) {
      return null;
    }

    return (
      <ContentWrapper>
        <Card header={order.ref} headerPosition="outside">
          <Text style={styles.label}>{orderItem.product.name}</Text>
          <Text>Quantity: {order.quantity} {orderItem.product.package_unit}</Text>
          <Text>Price: {orderItem.product.price * order.quantity} {orderItem.producer.currency}</Text>
        </Card>

        <Card>
          <Text style={styles.label}>{orderItem.producer.name}</Text>
          <Text>Address: {orderItem.producer.address}, {orderItem.producer.zip}, {orderItem.producer.city}</Text>
          <Text>Payment: {orderItem.producer.payment_info}</Text>
        </Card>

        <Card>
          <Text style={styles.label}>{orderItem.node.name}</Text>
          <Text>Address: {orderItem.node.address}, {orderItem.node.zip}, {orderItem.node.city}</Text>
          <Text>Delivery: {orderItem.node.delivery_weekday} {moment(orderDate.date.date).format('YYYY-MM-DD')} {orderItem.node.delivery_time}</Text>
        </Card>

        <Card>
          <Button disabled={!isDeletable} loading={this.props.order.deleting} title="Delete order" onPress={this.deleteOrder.bind(this, order.id)} />
        </Card>
      </ContentWrapper>
    );
  }
}

const styles = {
  label: {
    fontFamily: 'montserrat-semibold',
  }
}

function mapStateToProps(state) {
  const { order } = state;

  return {
    order,
  }
}

export default connect(mapStateToProps)(Order);
