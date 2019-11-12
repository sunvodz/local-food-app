import React from 'react';
import { StackNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import Notifications from 'app/screens/User/screens/Notifications';
import Cart from 'app/screens/User/screens/Cart';
import { trans } from 'app/shared';
import CartIcon from 'app/containers/CartIcon';
import style from 'app/styles';

const routeConfig = {
  Notifications: {
    screen: (props) => {
      return <Notifications navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (props) => {
      // console.log(props.screenProps);

      let right = null;
      if (props.screenProps.auth.user) {
        right = <CartIcon size={20} color='#fff' style={{marginRight: 20}} onPress={() => props.navigation.navigate('Cart')} />
      }
      
      return {
        // header: null,
        title: trans('notifications', props.screenProps.lang),
        headerRight: right,
        headerBackTitle: null,
      }
    },
  },
  Cart: {
    screen: (props) => {
      return <Cart navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (props) => {
      return {
        // header: null,
        title: trans('cart', props.screenProps.lang),
        headerLeftTitle: null,
        // header: {
        //   // backTitle: null,
        // },
      }
    }
  },
};

const navigatorConfig = {
  defaultNavigationOptions: {
    headerStyle: style.stackNavigator.headerStyle,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  },
};

export default createStackNavigator(routeConfig, navigatorConfig);
