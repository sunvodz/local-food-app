import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import moment from 'moment';

import { ContentWrapper, Card, Badge, Button, ScreenHeader, Empty, Loader } from 'app/components';
import * as actions from './actions';
import { trans, priceHelper } from 'app/shared';

class Order extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchOrder(this.props.navigation.state.params));
  }

  componentWillUnmount() {
    this.props.dispatch(actions.resetOrder());
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
    const { order, loading } = this.props.order;

    if (loading) {
      return (
        <View style={{flex: 1}}>
          <ScreenHeader title={trans('order_deleted', this.props.lang)} left navigation={this.props.navigation} />
          <Loader />
        </View>
      );
    }

    if (!order || order.deleting || order.deleted) {
      return (
        <View style={{flex: 1}}>
          <ScreenHeader title={trans('order_deleted', this.props.lang)} left navigation={this.props.navigation} />
          <Empty icon='trash-o' header={trans('order_deleted', this.props.lang)} text={trans('order_deleted_text', this.props.lang)} />
        </View>
      );
    }

    const orderItem = order.order_item_relationship[0];
    const orderDate = order.order_date_relationship[0];
    const isDeletable = this.isDeletable(orderItem, orderDate);

    let title = trans('order', this.props.lang) + ' ' + order.ref;
    let pickup = trans('pickup_on', this.props.lang) + ' ' +  moment(orderDate.date.date).format('YYYY-MM-DD') + ' ' + orderItem.node.delivery_time;

    let totalPrice = priceHelper.getCalculatedPriceFormatted(orderItem.product, orderItem.variant, order.quantity, orderItem.producer.currency, true);

    return (
      <View style={{flex: 1}}>
        <ScreenHeader title={title} sub={pickup} left navigation={this.props.navigation} />
        <ContentWrapper>
          <Card header={trans('product', this.props.lang)} headerPosition="outside" footer={<Badge label={`${trans('price_to_pay', this.props.lang)}: ${totalPrice}`} />}>
            <Text style={styles.label}>{orderItem.product.name}</Text>
            <Text style={styles.text}>{trans('quantity', this.props.lang)}: {order.quantity} {orderItem.product.package_unit}</Text>
          </Card>

          <Card header={trans('node', this.props.lang)} headerPosition='outside'>
            <View style={styles.section}>
              <Text style={styles.label}>{orderItem.node.name}</Text>
              <Text style={styles.text}>{orderItem.node.address}</Text>
              <Text style={styles.text}>{orderItem.node.zip}, {orderItem.node.city}</Text>
            </View>

            <Text style={styles.label}>{trans('pickup', this.props.lang)}</Text>
            <Text style={styles.text}>{trans(orderItem.node.delivery_weekday, this.props.lang)} {moment(orderDate.date.date).format('YYYY-MM-DD')} {orderItem.node.delivery_time}</Text>
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

          <View style={{marginTop: 15}}>
            <Button disabled={!isDeletable} loading={this.props.order.deleting} title={trans('delete_order', this.props.lang)} onPress={this.deleteOrder.bind(this, order.id)} />
          </View>
        </ContentWrapper>
      </View>
    );
  }
}

let styles = {
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
