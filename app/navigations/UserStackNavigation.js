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
    navigationOptions: (navigation) => {
      return {
        title: 'Profile',
        headerStyle: globalStyles.stackNavigator.headerStyle
      }
    }
  },
  OrderDetails: {
    screen: OrderDetails,
    navigationOptions: {
      headerStyle: globalStyles.stackNavigator.headerStyle,
      title: 'Order',
      headerBackTitle: 'Orders',
    }
  }
};

const navigatorConfig = {};

export default StackNavigator(routeConfig, navigatorConfig);
