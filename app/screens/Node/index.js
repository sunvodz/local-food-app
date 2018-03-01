import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import _ from 'lodash';

import { Loader, ProductCard, NumberInput, Button } from 'app/components';
import NodeHeader from './containers/NodeHeader';
import * as actions from './actions';

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      refreshing: false,
    };

    this.renderProduct = this.renderProduct.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.node, this.props.node) || !_.isEqual(nextProps.auth, this.props.auth);
  }

  componentDidMount() {
    const node = this.props.navigation.state.params;

    this.props.dispatch(actions.fetchNode(node.id));
    this.props.dispatch(actions.fetchProducts({
      node: node.id
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    const prevFilters = _.get(prevProps, 'node.filters');

    if (!_.isEqual(this.props.node.filters, prevFilters) && !this.props.node.loadingProducts) {
      this.props.dispatch(actions.fetchProducts(this.props.node.filters));
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

  renderProduct(product, rowId) {
    let image = null; // Fallback here
    if (product.image_relationship && product.image_relationship.length > 0) {
      image = product.image_relationship[0].urls.medium;
    }

    return (
      <ProductCard key={product.id} header={product.name} onPress={this.navigateProduct.bind(this, product)} image={image} column={2} />
    );
  }

  render() {
    const { products } = this.props.node;
    const node = this.props.node.node || this.props.navigation.state.params;

    if (this.props.node.loadingProducts) {
      return (
        <View style={styles.scrollView}>
          <NodeHeader node={node} />
          <Loader />
        </View>
      );
    }

    if (!products || products.length === 0) {
      return (
        <ProductCard header="No products">
          <Text>No products here...</Text>
        </ProductCard>
      );
    }

    let productCards = _.map(products, (product, index) => {
      return this.renderProduct(product, index);
    });

    return (
      <ScrollView style={styles.scrollView} bounces={false}>
        <NodeHeader node={node} />
        <View style={styles.productWrapper}>
          {productCards}
        </View>
      </ScrollView>
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

const styles = {
  scrollView: {
    backgroundColor: '#fff',
    flex: 1,
  },
  productWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 15,
  }
};