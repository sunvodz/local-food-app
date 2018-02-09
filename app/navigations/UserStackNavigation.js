import React from 'react';
import { StackNavigator } from 'react-navigation';

import Profile from 'app/screens/User/screens/Profile';
import OrderDetails from 'app/screens/User/screens/OrderDetails';

const routeConfig = {
  Profile: {
    screen: (navigation) => {
      return <Profile screenProps={{ userStackNavigation: navigation }} />;
    },
    navigationOptions: {
      title: 'Profile',
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 2,
        borderColor: '#eee'
      }
    }
  },
  OrderDetails: {
    screen: OrderDetails,
    navigationOptions: {
      title: 'Order',
      headerBackTitle: 'Orders',
    }
  }
};

const navigatorConfig = {};

export default StackNavigator(routeConfig, navigatorConfig);
