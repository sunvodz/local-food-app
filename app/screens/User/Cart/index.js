import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import moment from 'moment/min/moment-with-locales';
import _ from 'lodash';
import { Loader, Button, Empty, List, ListSection } from 'app/components';
import CartItem from './components/CartItem';
import * as actions from './actions';
import { trans, priceHelper } from 'app/shared';
import globalStyle from 'app/styles';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.fetchCart();
  }

  componentDidUpdate(prevProps, prevState) {
    this.fetchCart();
  }

  fetchCart(refresh) {
    if (this.props.cart.cart === undefined || refresh) {
      this.props.dispatch(actions.fetchCart(refresh));
    }
  }

  removeCartItem(id) {
    this.props.dispatch(actions.removeCartItem(id, this.props.system.lang));
  }

  updateCartItem(id, quantity) {
    this.props.dispatch(actions.updateCartItem(id, quantity, this.props.system.lang));
  }

  createOrder() {
    this.props.dispatch(actions.createOrder(this.props.system.lang));
  }

  navigateToOrders() {
    this.props.navigation.navigate('UserStackNavigation');
  }

  groupCartDateItemLinksByDate(cartDateItemLinks) {
    let groupedCartDateItemLinks = [];
    for (let i = 0; i < cartDateItemLinks.length; i++) {
      let cartDateItemLink = cartDateItemLinks[i];
      let cartDate = cartDateItemLink.date;
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

  renderListSection(ca, sectionId, rowId) {
    const cartDateItemLinks = ca.item
    let m = moment(cartDateItemLinks.key);
    let date = m.format('DD') + ' ' + trans(m.format('MMMM'), this.props.system.lang) + ' ' + m.format('YYYY');

    const { updatingCartItems } = this.props.cart;

    let listItems = _.map(cartDateItemLinks.items, (cartDateItemLink, index) => {
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
      <ListSection label={trans('Pickup', this.props.system.lang) + ' ' + date} key={sectionId}>
        {listItems}
      </ListSection>
    );
  }

  render() {
    const { loading, refreshing, cart } = this.props.cart;
    const lang = this.props.system.lang;
    moment.locale(lang);

    if (loading) {
      return (
        <View style={{flex: 1, backgroundColor: globalStyle.backgroundColor}}>
          <Loader />
        </View>
      );
    }

    if (this.props.cart.created) {
      let action = <Button title={trans('View orders', lang)} onPress={this.navigateToOrders.bind(this)} />;

      return (
        <View style={{flex: 1, backgroundColor: globalStyle.backgroundColor}}>
          <Empty icon="shopping-cart" header={trans('Created!', lang)} text={trans('Your order is created.', lang)} action={action} />
        </View>
      );
    }

    if (!refreshing && _.isEmpty(cart)) {
      return (
        <View style={{flex: 1, backgroundColor: globalStyle.backgroundColor}}>
          <Empty icon="shopping-cart" header={trans('Shopping cart is empty', lang)} text={trans('Visit a node to find available products.', lang)} />
        </View>
      );
    }

    let totalCost = _.chain(cart)
    .groupBy(cartDateItemLink => {
      let item = cartDateItemLink.item;
      return item.producer.currency;
    })
    .mapValues((cartDateItemLinks, currency) => {
      return _.sumBy(cartDateItemLinks, (cartDateItemLink) => {
        let item = cartDateItemLink.item;
        let price = priceHelper.getCalculatedPrice(item.product, item.variant, cartDateItemLink.quantity);

        return price;
      });
    })
    .map((total, currency) => {
      if (!currency || currency === 'null') {
        currency = '';
      }

      return <Text style={styles.orderText} key={currency}>{total} {currency}</Text>;
    })
    .value();

    let cartDateItemLinksByDate = this.groupCartDateItemLinksByDate(cart);

    let listProps = {
      data: cartDateItemLinksByDate,
      renderItem: this.renderListSection.bind(this),
      onRefresh: this.fetchCart.bind(this, true),
      refreshing: refreshing,
    }

    return (
      <View style={{flex: 1}}>
        <List {...listProps} />
        <View style={styles.orderWrapper}>
          <View style={styles.orderTotals}>{totalCost}</View>
          <Button loading={this.props.cart.creating} icon='shopping-cart' title={trans('Send order', lang)} onPress={this.createOrder.bind(this)} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { cart, system } = state;

  return {
    cart,
    system,
  };
}

export default connect(mapStateToProps)(Cart);

let styles = {
  totalCost: {
    alignSelf: 'center',
  },
  orderWrapper: {
    backgroundColor: globalStyle.primaryColor,
    flexDirection: 'row',
    padding: 15,

    width: '100%',
  },
  orderTotals: {
    flex: 1,
    flexDirection: 'column',
  },
  orderText: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
  },
  orderButton: {
    flex: 1,
    button: {
      backgroundColor: '#ff9800',
    },
    title: {
      color: '#333',
    },
    icon: {
      color: '#333',
    }
  },
};
