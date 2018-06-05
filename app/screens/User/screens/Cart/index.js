import React from 'react';
import { connect } from 'react-redux';
import { View, ListView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import _ from 'lodash';

import AuthScreen from 'app/screens/Auth';

import { ContentWrapper, Loader, Card, Text, QuantityInput, Button, Empty, List, ListItem, ListSection, ScreenHeader } from 'app/components';
import CartItem from './components/CartItem';
import * as actions from './actions';
import { updateCartItem } from './actions';
import { trans } from 'app/shared';

const DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      refreshing: false,
    }
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

  removeCartItem(id) {
    this.props.dispatch(actions.removeCartItem(id));
  }

  updateCartItem(id, quantity) {
    this.props.dispatch(actions.updateCartItem(id, quantity));
  }

  createOrder() {
    this.props.dispatch(actions.createOrder());
  }

  groupCartDateItemLinksByDate(cartDateItemLinks) {

    let groupedCartDateItemLinks = [];
    for (let i = 0; i < cartDateItemLinks.length; i++) {
      let cartDateItemLink = cartDateItemLinks[i];
      let cartDate = cartDateItemLink.cart_date_relationship[0];
      let key = moment(cartDate.date.date).format('YYYYMMDD');

      // Check if key exists
      let index = _.findIndex(groupedCartDateItemLinks, function(o) {
        return o.key == key;
      });

      if (index === -1) {
        groupedCartDateItemLinks.push({
          key: key,
          items: [],
        });

        // Set index
        index = groupedCartDateItemLinks.length - 1;
      }

      groupedCartDateItemLinks[index].items.push(cartDateItemLink);
    }

    return groupedCartDateItemLinks;
  }

  renderListSection(cartDateItemLinks, sectionId, rowId) {
    let m = moment(cartDateItemLinks.key);
    let date = m.format('DD') + ' ' + trans(m.format('MMMM'), this.props.lang) + ' ' + m.format('YYYY');
    let numberOfListItems = cartDateItemLinks.items.length - 1;

    const { loading, updatingCartItems, refreshing, cart } = this.props.cart;

    let listItems = _.map(cartDateItemLinks.items, (cartDateItemLink, index) => {
      let dateItem = cartDateItemLink.cart_date_relationship[0];
      let cartItem = cartDateItemLink.cart_item_relationship[0];
      let isLastListItem = index === numberOfListItems;

      let loading = updatingCartItems.indexOf(cartDateItemLink.id) !== -1;
      let cartItemProps = {
        key: cartDateItemLink.id,
        data: cartDateItemLink,
        loading: loading,
        onRemove: this.removeCartItem.bind(this),
        onUpdate: this.updateCartItem.bind(this)
      }

      return <CartItem {...cartItemProps} lang={this.props.lang} />;
    });

    return (
      <ListSection label={trans('pickup', this.props.lang) + ' ' + date}>
        {listItems}
      </ListSection>
    );
  }

  render() {
    const { loading, updatingCartItems, refreshing, cart } = this.props.cart;

    if (!this.props.auth.user || this.props.auth.loading) {
      return <AuthScreen {...this.props} fullscreen={true} />;
    }

    if (loading) {
      return (
        <View style={{flex: 1, backgroundColor: '#f4f4f0'}}>
          <ScreenHeader title={trans('cart', this.props.lang)} left navigation={this.props.navigation} />
          <Loader />
        </View>
      );
    }

    if (!refreshing && _.isEmpty(cart)) {
      return (
        <View style={{flex: 1, backgroundColor: '#f4f4f0'}}>
          <ScreenHeader title={trans('cart', this.props.lang)} left navigation={this.props.navigation} />
          <Empty icon="shopping-basket" header={trans('cart_empty', this.props.lang)} text={trans('cart_empty_text', this.props.lang)} />
        </View>
      );
    }

    let totalCost = _.chain(cart)
    .groupBy(cartDateItemLink => {
      let item = cartDateItemLink.cart_item_relationship[0];
      return item.producer.currency;
    })
    .mapValues((cartDateItemLinks, currency) => {
      return _.sumBy(cartDateItemLinks, (cartDateItemLink) => {
        let item = cartDateItemLink.cart_item_relationship[0];
        let price = item.product.price;

        if (item.variant) {
          price = item.variant.price;
        }

        return price * cartDateItemLink.quantity;
      });
    })
    .map((total, currency) => {
      return <Text style={styles.totalCost} key={currency}>{total} {currency}</Text>;
    })
    .value();

    let cartDateItemLinksByDate = this.groupCartDateItemLinksByDate(cart);

    let listProps = {
      dataSource: DataSource.cloneWithRows(cartDateItemLinksByDate),
      renderRow: this.renderListSection.bind(this),
      onRefresh: this.fetchCart.bind(this),
      refreshing: refreshing,
    }

    return (
      <View style={{flex: 1, backgroundColor: '#f4f4f0'}}>
        <ScreenHeader title={trans('cart', this.props.lang)} sub={totalCost} left navigation={this.props.navigation} />
        <List {...listProps} />
        <Button style={buttonStyle} loading={this.props.cart.creating} icon='shopping-basket' title={trans('send_order', this.props.lang)} onPress={this.createOrder.bind(this)} />
      </View>
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

const styles = {
  totalCost: {
    alignSelf: 'center',
    fontFamily: 'montserrat-semibold',
  }
};

const buttonStyle = {
  button: {
    marginTop: 15,
    marginBottom: 15
  }
};