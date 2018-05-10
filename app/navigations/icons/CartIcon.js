import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <View style={styles.wrapper}>
        <Icon name="shopping-basket" size={this.props.size} color={this.props.color} onPress={this.props.onPress}/>
        {notification}
      </View>
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

const styles = {
  wrapper: {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  notificationWrapper: {
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 4,
    height: 20,
    width: 20,
    position: 'absolute',
    top: 10,
    right: 10,
    overflow: 'hidden',
  },
  notificationText: {
    color: '#bf360c',
    fontFamily: 'montserrat-semibold',
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
  }
};
