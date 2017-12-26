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

  renderOrders(rowData) {
    let orderDate = moment(rowData[0].date.date.date).format('YYYY-MM-DD');
    let orders = _.map(rowData, (order) => {
      return <Text onPress={this.navigateOrder.bind(this, order)} key={order.id}>{order.ref}</Text>;
    });

    return (
      <Card header={orderDate}>
        {orders}
      </Card>
    );
  }

  render() {
    let content = <Loader />;

    if (this.state.dataSource) {
      let refreshControl = <RefreshControl refreshing={this.props.orders.loading} onRefresh={this.onRefresh.bind(this)} />;

      let listViewProps = {
        dataSource: this.state.dataSource,
        renderRow: this.renderOrders.bind(this),
        refreshControl: refreshControl
      }

      content = <ListView {...listViewProps} />;
    }

    return (
      <View style={{flex: 1}}>
        <ContentWrapper>
          {content}
        </ContentWrapper>
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
