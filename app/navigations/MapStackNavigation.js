import React from 'react';
import { StackNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {View, Text} from 'react-native'

import Map from 'app/screens/Map';
import Node from 'app/screens/Node';
import Cart from 'app/screens/User/screens/Cart';
import Auth from 'app/screens/Auth';
import { trans } from 'app/shared';
import style from 'app/styles';
import CartIcon from 'app/containers/CartIcon'
import { FontAwesome as Icon } from '@expo/vector-icons';

const routeConfig = {
  map: {
    screen: props => {
      return <Map navigation={props.navigation} lang={props.screenProps.lang} />
    },
    navigationOptions: (props) => {
      let right = null;
      if (props.screenProps.auth.user) {
        right = <CartIcon size={16} color='#fff' style={{marginRight: 20}} onPress={() => props.navigation.navigate('cart')} />
      }

      let left = null;
      if (props.screenProps.auth.user) {
        f = props.navigation.getParam('leftOnPress', null);
        left = <Icon style={{marginLeft: 20}} name={props.navigation.getParam('icon', 'globe')} size={20} color='#fff' onPress={f}/>;
      }

      return {
        title: props.navigation.getParam('title'),
        headerRight: right,
        headerBackTitle: null,
        headerLeft: left
      }
    }
  },
  node: {
    screen: props => {
      return <Node navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (props) => {
      return {
        header: null,
      }
    }
  },
  cart: {
    screen: props => {
      return <Cart navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (props) => {
      return {
        title: trans('Cart', props.screenProps.lang),
        headerLeftTitle: null,
      }
    }
  },
  auth: {
    screen: props => {
      return <Auth navigation={props.navigation} lang={props.screenProps.lang} />
    },
    navigationOptions: ({ navigation }) => {
      return {
        header: null,
      };
    }
  },
};

const navigatorConfig = {
  headerMode: 'float',
  initialRouteName: 'map',
  defaultNavigationOptions: (props) => {
    const navigation = props.navigation;

    return {
      headerStyle: style.stackNavigator.headerStyle,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
};

export default createStackNavigator(routeConfig, navigatorConfig);
