import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import moment from 'moment';

import { ContentWrapper, Card, Loader, Button, ScreenHeader } from 'app/components';
import * as actions from './actions';
import * as orderActions from '../Orders/actions';
import { trans } from 'app/shared';

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

    let title = trans('order', this.props.lang) + ' ' + order.ref;
    let pickup = trans('pickup_on', this.props.lang) + ' ' +  moment(orderDate.date.date).format('YYYY-MM-DD') + ' ' + orderItem.node.delivery_time;

    return (
      <View style={{flex: 1}}>
        <ScreenHeader title={title} sub={pickup} left navigation={this.props.navigation} />
        <ContentWrapper>
          <Card header={trans('node', this.props.lang)} headerPosition='outside'>
            <View style={styles.section}>
              <Text style={styles.label}>{orderItem.node.name}</Text>
              <Text style={styles.text}>{orderItem.node.address}</Text>
              <Text style={styles.text}>{orderItem.node.zip}, {orderItem.node.city}</Text>
            </View>

            <Text style={styles.label}>{trans('pickup', this.props.lang)}</Text>
            <Text style={styles.text}>{orderItem.node.delivery_weekday} {moment(orderDate.date.date).format('YYYY-MM-DD')} {orderItem.node.delivery_time}</Text>
          </Card>

          <Card header={trans('product', this.props.lang)} headerPosition="outside">
            <Text style={styles.label}>{orderItem.product.name}</Text>
            <Text style={styles.text}>{trans('quantity', this.props.lang)}: {order.quantity} {orderItem.product.package_unit}</Text>
            <Text style={styles.text}>{trans('price', this.props.lang)}: {orderItem.product.price * order.quantity} {orderItem.producer.currency}</Text>
          </Card>

          <Card header={trans('producer', this.props.lang)} headerPosition='outside'>
            <View style={styles.section}>
              <Text style={styles.label}>{orderItem.producer.name}</Text>
              <Text style={styles.text}>{orderItem.producer.address}</Text>
              <Text style={styles.text}>{orderItem.producer.zip}, {orderItem.producer.city}</Text>
            </View>

            <Text style={styles.label}>{trans('payment', this.props.lang)}</Text>
            <Text style={styles.text}>{orderItem.producer.payment_info}</Text>
          </Card>

          <Button disabled={!isDeletable} loading={this.props.order.deleting} title="Delete order" onPress={this.deleteOrder.bind(this, order.id)} />
        </ContentWrapper>
      </View>
    );
  }
}

const styles = {
  label: {
    fontFamily: 'montserrat-semibold',
  },
  text: {
    fontFamily: 'montserrat-regular',
  },
  section: {
    marginBottom: 10,
  }
}

function mapStateToProps(state) {
  const { order } = state;

  return {
    order,
  }
}

export default connect(mapStateToProps)(Order);
