import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, ListView, RefreshControl } from 'react-native';
import moment from 'moment';

import { OrderModal } from './components';
import { ContentWrapper, Card, Loader } from '../../components';
import * as actions from './actions';

const DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class OrdersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      refreshing: false,
      modal: {
        visible: false,
        order: null,
      }
    }
  }

  componentDidMount() {
    if (this.props.auth.token) {
      this.props.dispatch(actions.requestOrders(this.props.auth.token));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { orders } = this.props.userOrders;

    if (orders && prevProps.userOrders.orders !== orders) {
      // let data = this.formatOrdersForListView(this.props.userOrders.orders);
      this.setState({
        dataSource: DataSource.cloneWithRows(orders)
      });
    }
  }

  onRefresh() {
    this.props.dispatch(actions.requestOrders(this.props.auth.token));
  }

  openOrderModal(orderData) {
    this.setState({
      modal: {
        visible: true,
        orderData: orderData
      }
    });
  }

  closeOrderModal() {
    this.setState({
      modal: {
        visible: false,
        orderData: null,
      }
    });
  }

  renderDateRow(rowData) {
    return <Text onPress={this.openOrderModal.bind(this, rowData)}>{rowData.ref}</Text>;
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
    let content = null;

    if (!this.state.dataSource) {
      content = <Loader />;
    } else if (this.state.dataSource) {
      content = <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderDateRows.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={this.props.userOrders.loading}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      />;
    }

    let orderModal = null;
    if (this.state.modal.visible) {
      orderModal = <OrderModal visible={this.state.modal.visible} orderData={this.state.modal.orderData} closeHandler={this.closeOrderModal.bind(this)} />;
    }

    return (
      <View style={{flex: 1, backgroundColor: 'green'}}>
        <ContentWrapper>
          {content}
        </ContentWrapper>
        {orderModal}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth, userOrders } = state;

  return {
    auth,
    userOrders,
  }
}

OrdersScreen.defaultProps = {
  loading: false,
};

export default connect(mapStateToProps)(OrdersScreen);
