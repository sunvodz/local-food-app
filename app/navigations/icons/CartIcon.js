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
      notification = <Text style={styles.notification}>{this.props.cart.cart.length}</Text>;
    }

    return (
      <View>
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
  notification: {
    backgroundColor: '#fff',
    borderRadius: 30,
    color: '#bf360c',
    elevation: 2,
    fontFamily: 'montserrat-semibold',
    fontSize: 12,
    height: 20,
    width: 20,
    textAlign: 'center',
    lineHeight: 17,
    position: 'absolute',
    top: -10,
    right: -5,
  }
};
