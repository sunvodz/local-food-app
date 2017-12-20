import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, ListView, RefreshControl } from 'react-native';
import moment from 'moment';

import { ContentWrapper, Card, Loader } from 'app/components';
import * as actions from './actions';

const DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class OrdersList extends Component {
  constructor(props) {
    console.log('ORDER LIST CONST!!!');
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

  renderDateRow(rowData) {
    return <Text onPress={this.navigateOrder.bind(this, rowData)}>{rowData.ref}</Text>;
  }

  renderDateRows(rowData) {
    let dataSource = DataSource.cloneWithRows(rowData);
    let orderDate = moment(rowData[0].date.date.date).format('YYYY-MM-DD');

    return (
      <Card header={orderDate}>
        <ListView dataSource={dataSource} renderRow={this.renderDateRow.bind(this)} />
      </Card>
    );
  }

  render() {
    let content = <Loader />;

    if (this.state.dataSource) {
      let refreshControl = <RefreshControl refreshing={this.props.orders.loading} onRefresh={this.onRefresh.bind(this)} />;

      let listViewProps = {
        dataSource: this.state.dataSource,
        renderRow: this.renderDateRows.bind(this),
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

OrdersList.defaultProps = {
  loading: false,
};

function mapStateToProps(state) {
  const { auth, orders } = state;

  return {
    auth,
    orders,
  }
}

export default connect(mapStateToProps)(OrdersList);
