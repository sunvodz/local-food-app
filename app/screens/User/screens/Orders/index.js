import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, ListView, RefreshControl } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import { ContentWrapper, Card, Loader } from 'app/components';
import * as actions from './actions';

const DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      refreshing: false,
    }
  }

  componentDidMount() {
    this.props.dispatch(actions.requestOrders());
  }

  componentDidUpdate(prevProps, prevState) {
    const { orders } = this.props.orders;

    if (orders && prevProps.orders.orders !== orders) {
      this.setState({
        dataSource: DataSource.cloneWithRows(orders)
      });
    }
  }

  onRefresh() {
    this.props.dispatch(actions.requestOrders());
  }

  navigateOrder(orderData) {
    const { navigate } = this.props.navigation;
    navigate('OrderDetails', orderData);
  }

  renderOrderDateCard(orders, sectionId, rowId) {
    let date = moment(orders[0].date.date.date).format('YYYY-MM-DD');
    let orderRows = _.map(orders, (order) => {
      return <Text onPress={this.navigateOrder.bind(this, order)} key={order.id}>{order.ref}</Text>;
    });

    let style = {
      card: { 
        margin: 15,
        marginBottom: 5
      }
    }

    let numberOfOrders = Object.keys(this.props.orders.orders).length;
    console.log(numberOfOrders, sectionId, rowId);
    if ((numberOfOrders - 1) == rowId) {
      style.card.marginBottom = 15;
    }

    return (
      <Card header={date} style={style}>
        {orderRows}
      </Card>
    );
  }

  render() {
    let content = <Loader />;

    if (this.state.dataSource) {
      let refreshControl = <RefreshControl refreshing={this.props.orders.loading} onRefresh={this.onRefresh.bind(this)} />;

      let listViewProps = {
        dataSource: this.state.dataSource,
        renderRow: this.renderOrderDateCard.bind(this),
        refreshControl: refreshControl
      }

      content = <ListView {...listViewProps} />;
    }

    return (
      <View style={{flex: 1}}>
        {content}
      </View>
    );
  }
}

Orders.defaultProps = {
  loading: false,
};

function mapStateToProps(state) {
  const { auth, orders } = state;

  return {
    auth,
    orders,
  }
}

export default connect(mapStateToProps)(Orders);
