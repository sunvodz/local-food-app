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
    this.props.dispatch(actions.fetchProducts({
      node: node.id
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { loading, node, products, filters } = this.props.node;
    const prevNode = _.get(prevProps, 'node.node');
    const prevProducts = _.get(prevProps, 'node.products');
    const prevFilters = _.get(prevProps, 'node.filters');

    if (products && products !== prevProducts && !loading) {
      this.setState({
        dataSource: DataSource.cloneWithRows(products)
      });
    }

    if (filters !== prevFilters && !loading) {
      this.props.dispatch(actions.fetchProducts(filters));
    }
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
    const { loading, node } = this.props.node;

    let content = <Loader />;

    if (this.state.dataSource && !loading) {
      let listViewProps = {
        dataSource: this.state.dataSource,
        renderRow: this.renderProduct.bind(this),
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
