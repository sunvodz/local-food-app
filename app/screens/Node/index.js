import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import _ from 'lodash';
import striptags from 'striptags';
import ent from 'ent';

import { ContentWrapper, Loader, Card, NumberInput, Button } from 'app/components';
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
    const { loading, node, products, filters } = this.props.node;

    const prevNode = _.get(prevProps, 'node.node');
    const prevProducts = _.get(prevProps, 'node.products');
    const prevFilters = _.get(prevProps, 'node.filters');

    if (products && products !== prevProducts && !loading) {
      // this.setState({
      //   dataSource: DataSource.cloneWithRows(products)
      // });
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

  renderProduct(product, rowId) {
    let image = null; // Fallback here
    if (product.image_relationship && product.image_relationship.length > 0) {
      image = product.image_relationship[0].urls.medium;
    }

    //  <Text>{ent.decode(striptags(product.info))}</Text>
    return (
      <Card key={product.id} header={product.name} onPress={this.navigateProduct.bind(this, product)} image={image}>

      </Card>
    );
  }

  render() {
    const { loading, node, products } = this.props.node;

    if (loading) {
      return <Loader />;
    }

    if (!products || products.length === 0) {
      return (
        <Card header="No products">
          <Text>No products here...</Text>
        </Card>
      );
    }

    let p = products.map((product, index) => {
      return this.renderProduct(product, index);
    });

    return (
      <ContentWrapper>
        {p}
      </ContentWrapper>
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
