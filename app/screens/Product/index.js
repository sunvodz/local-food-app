import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import _ from 'lodash';

import AuthScreen from 'app/screens/Auth';
import MembershipScreen from 'app/screens/Membership';
import { Loader, TextInput, ContentWrapper, Card, Button } from 'app/components';
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
    return !_.isEqual(nextProps, this.props);
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
    const { auth, product } = this.props;

    if (product.loading) {
      return <Loader />;
    }

    let orderForm = <AuthScreen {...this.props} />;
    if (auth.user) {
      // if (auth.)
      if (auth.user.membership_payments_relationship && auth.user.membership_payments_relationship.length > 0) {
        orderForm = (
          <OrderForm
            {...this.state}
            dates={product.dates}
            addToCart={this.addToCart.bind(this)}
            isVisible={this.state.modal.isVisible}
            onClose={this.toggleModal.bind(this, false)}
          />
        );
      } else {
        orderForm = <MembershipScreen {...this.props} />;
      }
    }

    return (
      <ContentWrapper>
        <Card header="About the product">
          <HTMLView value={this.state.product.info} />
        </Card>

        {orderForm}
      </ContentWrapper>

    );
  }
}

function mapStateToProps(state) {
  const { product, auth, membership } = state;

  return {
    product,
    auth,
    membership
  }
}

export default connect(mapStateToProps)(Product);
