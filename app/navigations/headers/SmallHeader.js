import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CartIcon from '../icons/CartIcon';

class SmallHeader extends React.Component {
  goBack() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  navigateToCart() {
    const { navigate } = this.props.navigation;

    navigate('Cart');
  }

  render() {
    let left = null;
    if (this.props.left === true) {
      left = <Icon name='chevron-left' style={styles.backIcon} onPress={this.goBack.bind(this)} />;
    } else if (this.props.left) {
      left = this.props.left;
    }

    let right = null;
    if (this.props.right === true) {
      right = <CartIcon style={styles.shoppingIcon} size={20} color='#fff' onPress={this.navigateToCart.bind(this)} />;
    } else if (this.props.right) {
      right = this.props.right;
    }

    return (
      <View style={styles.view}>
        <View style={styles.left}>
          {left}
        </View>
        <Text style={styles.middle}>{this.props.title}</Text>
        <View style={styles.right}>
          {right}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth, cart } = state;

  return {
    auth,
    cart,
  }
}

export default connect(mapStateToProps)(SmallHeader);

const styles = {
  view: {
    backgroundColor: '#bf360c',
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    height: 88,
  },
  left: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    flex: 1,
    marginLeft: 10,
  },
  middle: {
    alignSelf: 'center',
    color: '#fff',
    flex: 3,
    fontFamily: 'montserrat-semibold',
    fontSize: 16,
    textAlign: 'center',
  },
  right: {
    alignItems: 'flex-end',
    alignSelf: 'center',
    flex: 1,
    marginRight: 10,
  },
  backIcon: {
    color: '#fff',
    fontSize: 20,
  },
  shoppingIcon: {
    color: '#fff',
    fontSize: 20,
  }
};