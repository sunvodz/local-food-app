import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import _ from 'lodash';

import AuthScreen from 'app/screens/Auth';

import { ContentWrapper, Loader, Card, Text, QuantityInput, Button } from 'app/components';
import CartItem from './components/CartItem';
import * as actions from './actions';

class Cart extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.cart, this.props.cart) || !_.isEqual(nextProps.auth, this.props.auth);
  }

  componentDidMount() {
    this.fetchCart();
  }

  componentDidUpdate(prevProps, prevState) {
    this.fetchCart();
  }

  fetchCart(refresh) {
    if (this.props.auth.user && (this.props.cart.cart === undefined || refresh)) {
      this.props.dispatch(actions.fetchCart(refresh));
    }
  }

  sortCartDateItemLinksByDate(cartDateItemLinks) {
    let cartDateItemLinksByDate = {};

    _.each(cartDateItemLinks, cartDateItemLink => {
      let cartDate = cartDateItemLink.cart_date_relationship[0];
      let date = moment(cartDate.date.date).format('YYYYMMDD');

      if (!cartDateItemLinksByDate.date) {
        cartDateItemLinksByDate[date] = [];
      }

      cartDateItemLinksByDate[date].push(cartDateItemLink);
    });

    return cartDateItemLinksByDate;
  }

  removeCartItem(id) {
    this.props.dispatch(actions.removeCartItem(id));
  }

  updateCartItem(id, quantity) {
    this.props.dispatch(actions.updateCartItem(id, quantity));
  }

  render() {
    const { loading, loadingCartItems, refreshing, cart } = this.props.cart;

    if (!this.props.auth.user || this.props.auth.loading) {
      return <AuthScreen {...this.props} />;
    }

    if (loading || _.isEmpty(cart)) {
      return <Loader />;
    }

    if (!refreshing && _.isEmpty(cart)) {
      return (
        <ContentWrapper onRefresh={this.fetchCart.bind(this)} refreshing={false}>
          <Card header="Cart is empty">
            <Text>Visit a node to see products</Text>
          </Card>
        </ContentWrapper>
      );
    }

    let cartDateItemLinksByDate = this.sortCartDateItemLinksByDate(cart);

    // Render cart dates
    let cartDates = _.map(cartDateItemLinksByDate, (cartDateItemLinks, date) => {

      // Render cart items
      let cartItems = cartDateItemLinks.map(cartDateItemLink => {
        let loading = loadingCartItems.indexOf(cartDateItemLink.id) !== -1;

        let cartItemProps = {
          key: cartDateItemLink.id,
          data: cartDateItemLink,
          loading: loading,
          onRemove: this.removeCartItem.bind(this, cartDateItemLink.id),
          onUpdate: this.updateCartItem.bind(this, cartDateItemLink.id)
        }

        return <CartItem {...cartItemProps}/>;
      });

      return (
        <Card key={date} header={moment(date, 'YYYYMMDD').format('YYYY-MM-DD')}>
          {cartItems}
        </Card>
      );
    });

    return (
      <ContentWrapper onRefresh={this.fetchCart.bind(this)} refreshing={refreshing}>
        {cartDates}
        <Button title="Skicka beställning" />
      </ContentWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { auth, cart } = state;

  return {
    auth,
    cart,
  };
}


export default connect(mapStateToProps)(Cart);
