import React from 'react';
import { StackNavigator } from 'react-navigation';

import Profile from 'app/screens/User/screens/Profile';
import OrderDetails from 'app/screens/User/screens/OrderDetails';
import globalStyles from 'app/styles';

const routeConfig = {
  Profile: {
    screen: (navigation) => {
      return <Profile screenProps={{ userStackNavigation: navigation }} />;
    },
    navigationOptions: {
      title: 'Profile',
      headerStyle: Object.assign({}, globalStyles.stackNavigator.headerStyle, {
        borderBottomWidth: 2,
        borderBottomColor: '#f4f4f0',
      }),
      headerTitleStyle: globalStyles.stackNavigator.headerTitleStyle,
    }
  },
  OrderDetails: {
    screen: OrderDetails,
    navigationOptions: {
      title: 'Order',
      headerBackTitle: 'Orders',
      headerStyle: globalStyles.stackNavigator.headerStyle,
      headerTitleStyle: globalStyles.stackNavigator.headerTitleStyle,

    }
  }
};

const navigatorConfig = {};

export default StackNavigator(routeConfig, navigatorConfig);
