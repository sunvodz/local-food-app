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
    let notification = null;
    if (this.props.cart.cart && this.props.cart.cart.length > 0 && this.props.auth && this.props.auth.user) {
      notification = (
        <View style={styles.notificationWrapper}>
          <Text style={styles.notificationText}>{this.props.cart.cart.length}</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity style={styles.wrapper} activeOpacity={1} onPress={this.props.onPress}>
        <Icon name="shopping-basket" size={this.props.size} color={this.props.color}/>
        {notification}
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
  wrapper: {

  },
  notificationWrapper: {
    backgroundColor: '#ff9800',
    borderColor: '#fff',
    borderRadius: 30,
    borderWidth: 2,
    height: 24,
    overflow: 'hidden',
    position: 'absolute',
    right: -10,
    top: -10,
    width: 24,
  },
  notificationText: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
  }
};
