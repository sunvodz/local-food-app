import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import striptags from 'striptags';
import ent from 'ent';

import { Loader, TextInput, ContentWrapper, Card, Button } from 'app/components';
import { Alert } from 'app/containers';
import OrderForm from './components/OrderForm';
import * as actions from './actions';

class Product extends React.Component {
  constructor(props) {
    super(props);

    const { product, node, dates, filters } = props.navigation.state.params;

    this.state = {
      product: product,
      node: node,
      dates: dates,
      filters: filters,
      modal: {
        isVisible: false
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.product, this.props.product);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchDates(this.state.product.id, this.state.node.id));
  }

  toggleModal(visible) {
    let state = this.state;
    state.modal.isVisible = visible;
    this.setState(state);
  }

  addToCart(data) {
    this.props.dispatch(actions.addProductToCart({
      product_id: this.state.product.id,
      node_id: this.state.node.id,
      variant_id: data.variant_id,
      delivery_dates: data.dates,
      quantity: data.quantity,
    }));
  }

  render() {
    if (this.props.product.loading) {
      return <Loader />;
    }

    return (
      <ContentWrapper>
        <Card header="About the product">
          <Text>{ent.decode(striptags(this.state.product.info))}</Text>
        </Card>
        <OrderForm
          {...this.state}
          dates={this.props.product.dates}
          addToCart={this.addToCart.bind(this)}
          isVisible={this.state.modal.isVisible}
          onClose={this.toggleModal.bind(this, false)}
        />
      </ContentWrapper>

    );
  }
}

function mapStateToProps(state) {
  const { product } = state;

  return {
    product,
  }
}

export default connect(mapStateToProps)(Product);
