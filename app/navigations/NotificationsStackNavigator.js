import React from 'react';
import { StackNavigator } from 'react-navigation';
import Notifications from 'app/screens/User/screens/Notifications';
import Cart from 'app/screens/User/screens/Cart';

const routeConfig = {
  Notifications: {
    screen: (props) => {
      return <Notifications navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: ({navigation}) => {
      return {
        header: null,
      }
    }
  },
  Cart: {
    screen: (props) => {
      return <Cart navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: ({navigation}) => {
      return {
        header: null,
      }
    }
  },
};

const navigatorConfig = {};

export default StackNavigator(routeConfig, navigatorConfig);
