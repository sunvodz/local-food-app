import React from 'react';
import { connect } from 'react-redux';
import { ListView, RefreshControl, Text, View } from 'react-native';
import _ from 'lodash';
import striptags from 'striptags';
import ent from 'ent';

import { ContentWrapper, Loader, Card, NumberInput, Button } from 'app/components';
import * as actions from './actions';

const DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      refreshing: false,
    };

    this.renderProduct = this.renderProduct.bind(this);
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
    const { node, dates, filters } = this.props.node;

    navigate('Product', {
      product: product,
      node: node,
      dates: dates,
      filters: filters,
    });
  }

  renderProduct(product, sectionId, rowId) {
    let style = {
      card: { 
        margin: 20,
        marginBottom: 0
      }
    }

    if (this.props.node.products && (this.props.node.products.length - 1) == rowId) {
      style.card.marginBottom = 20;
    }

    let image = null; // Fallback here
    if (product.image_relationship && product.image_relationship.length > 0) {
      image = product.image_relationship[0].urls.medium;
    }

    return (
      <Card header={product.name} onPress={this.navigateProduct.bind(this, product)} style={style} image={image}>
        <Text>{ent.decode(striptags(product.info))}</Text>
      </Card>
    );
  }

  render() {
    const { loading, node } = this.props.node;

    if (loading) {
      return <Loader />;
    }

    if (!this.props.products) {
      return (
        <Card header="No products" style={style}>
          <Text>No products here...</Text>
        </Card>
      );
    }

    if (this.state.dataSource) {
      let listViewProps = {
        dataSource: this.state.dataSource,
        renderRow: this.renderProduct,
        enableEmptySections: true
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

let style = {
  card: { 
    margin: 20,
    marginBottom: 0
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
