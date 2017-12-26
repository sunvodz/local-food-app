import React from 'react';
import { connect } from 'react-redux';
import { ListView, RefreshControl, Text, View, Button } from 'react-native';
import _ from 'lodash';
import striptags from 'striptags';
import ent from 'ent';

import { ContentWrapper, Loader, Card } from 'app/components';
import * as actions from './actions';

const DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      refreshing: false,
    }
  }

  componentDidMount() {
    const node = this.props.navigation.state.params;

    this.props.dispatch(actions.fetchNode(node.id));
  }

  componentDidUpdate(prevProps, prevState) {
    const { node } = this.props.node;
    const prevNode = prevProps.node;

    if (node && prevProps.node.node !== node) {
      this.setState({
        dataSource: DataSource.cloneWithRows(node.products)
      });
    }
  }

  onRefresh() {
    this.props.dispatch(actions.requestNode());
  }

  navigateProduct(product) {
    const { navigate } = this.props.navigation;
    navigate('Product', product);
  }

  renderProduct(product) {
    return (
      <Card header={product.name} onPress={this.navigateProduct.bind(this, product)}>
        <Text>{ent.decode(striptags(product.info))}</Text>
      </Card>
    );
  }

  render() {
    const { node } = this.props.node;

    let content = <Loader />;

    if (this.state.dataSource) {
      let refreshControl = <RefreshControl refreshing={this.props.node.loading} onRefresh={this.onRefresh.bind(this)} />;

      let listViewProps = {
        dataSource: this.state.dataSource,
        renderRow: this.renderProduct.bind(this),
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

function mapStateToProps(state) {
  const { auth, node } = state;

  return {
    auth,
    node,
  }
}

export default connect(mapStateToProps)(Node);
