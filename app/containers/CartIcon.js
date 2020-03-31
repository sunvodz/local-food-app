import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

import * as actions from 'app/screens/User/screens/Cart/actions';

class CartIcon extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchCart());
  }

  render() {
    let active = false;
    if (this.props.cart.cart && this.props.cart.cart.length > 0 && this.props.auth && this.props.auth.user) {
      active = true;
    }

    let style = active ? styles.active : styles.passive;

    return (
      <TouchableOpacity style={style.wrapper} activeOpacity={1} onPress={this.props.onPress}>
        <Icon name="shopping-basket" style={style.icon} />
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state) {
  const { cart, auth } = state;

  return {
    cart,
    auth
  }
}

export default connect(mapStateToProps)(CartIcon);

let styles = {
  active: {
    wrapper: {
      backgroundColor: '#fff',
      borderRadius: 30,
      marginRight: 15,
      padding: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
    },
    icon: {
      color: '#bf360c',
    }
  },
  passive: {
    wrapper: {
      backgroundColor: '#bf360c',
      marginRight: 15,
      padding: 5,
    },
    icon: {
      color: '#fff'
    }
  },
  // notificationWrapper: {
  //   backgroundColor: '#ff9800',
  //   borderColor: '#fff',
  //   borderRadius: 30,
  //   borderWidth: 2,
  //   height: 24,
  //   overflow: 'hidden',
  //   position: 'absolute',
  //   right: -10,
  //   top: -10,
  //   width: 24,
  // },
  // notificationText: {
  //   color: '#fff',
  //   fontFamily: 'montserrat-semibold',
  //   fontSize: 12,
  //   lineHeight: 20,
  //   textAlign: 'center',
  // }
};
