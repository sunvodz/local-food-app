import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StatusBar, Platform, SafeAreaView } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

import { CartIcon } from 'app/containers';
import globalStyle from 'app/styles';

class ScreenHeader extends React.Component {
  goBack() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  navigateToCart() {
    const { navigate } = this.props.navigation;

    navigate('cart');
  }

  render() {
    let left = null;
    if (this.props.left === true) {
      left = <Icon name='chevron-left' style={styles.icon} size={16} color='#fff' onPress={this.goBack.bind(this)} />;
    } else if (this.props.left) {
      left = this.props.left;
    }

    let right = null;
    if (this.props.right === true && this.props.auth.user) {
      right = <CartIcon style={styles.icon} size={16} color='#fff' onPress={this.navigateToCart.bind(this)} />;
    } else if (this.props.right) {
      right = this.props.right;
    }

    let sub = null;
    if (this.props.sub) {
      sub = <Text style={styles.middleSub}>{this.props.sub}</Text>;
    }

    return (
      <SafeAreaView style={styles.view}>
        <View style={styles.left}>
          {left}
        </View>
        <View style={styles.middle}>
          <Text numberOfLines={1} style={styles.middleTitle}>{this.props.title}</Text>
          {sub}
        </View>
        <View style={styles.right}>
          {this.props.followNode}
          {right}
        </View>
      </SafeAreaView>
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

export default connect(mapStateToProps)(ScreenHeader);

let styles = {
  view: {
    backgroundColor: globalStyle.primaryColor,
    flexDirection: 'row',
    // paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  },
  left: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    flex: 1,
  },
  middle: {
    alignItems: 'center',
    flex: 3,
    justifyContent: 'center',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  middleTitle: {
    color: '#fff',
    fontFamily: 'montserrat-semibold',
    fontSize: 16,
  },
  middleSub: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    fontSize: 12,
  },
  right: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    color: '#fff',
    fontSize: 16,
    padding: 10,
  }
};