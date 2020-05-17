import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import * as actions from 'app/screens/User/Cart/actions';
import globalStyle from 'app/styles';

class CartIcon extends Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchCart());
  }

  render() {
    let active = false;
    if (this.props.cart.cart && this.props.cart.cart.length > 0) {
      active = true;
    }

    let style = active ? styles.hasProducts : styles.isEmpty;

    let counter = null;
    if (active) {
      counter = (
        <View style={styles.counter}>
          <Text style={styles.counterNumber}>{this.props.cart.cart.length}</Text>
        </View>
      );
    }

    return (
      <View>
        <Icon name="shopping-cart" size={this.props.size} color={this.props.color} style={style.icon} />
        {counter}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { cart } = state;

  return {
    cart,
  }
}

export default connect(mapStateToProps)(CartIcon);

let styles = {
  isEmpty: {
    icon: {
      //
    }
  },
  hasProducts: {
    icon: {
      //
    },
  },
  counter: {
    backgroundColor: globalStyle.primaryColor,
    borderRadius: 10,
    height: 16,
    justifyContent: 'center',
    right: -5,
    position: 'absolute',
    top: -5,
    width: 16,
  },
  counterNumber: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    fontSize: 10,
    textAlign: 'center',
  }
};
