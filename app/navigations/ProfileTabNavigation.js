import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from 'app/styles';

import Orders from 'app/screens/User/screens/Orders';
import OrderDetails from 'app/screens/User/screens/OrderDetails';
import Settings from 'app/screens/User/screens/Settings';
import Notifications from 'app/screens/User/screens/Notifications';

const RouteConfigs = {
  Orders: {
    screen: (navigation) => {
      return <Orders userStackNavigation={navigation.screenProps.userStackNavigation} />;
    }
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      tabBarLabel: 'Notifications',
      headerStyle: globalStyles.stackNavigator.headerStyle,
      headerTitleStyle: globalStyles.stackNavigator.headerTitleStyle,
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      headerStyle: globalStyles.stackNavigator.headerStyle,
      headerTitleStyle: globalStyles.stackNavigator.headerTitleStyle,
    }
  },
};

const TabNavigatorConfig = {
  animationEnabled: true,
  lazy: true,
  swipeEnabled: true,
  tabBarOptions: {
    showIcon: false,
    showLabel: true,
    activeTintColor: '#333',
    inactiveTintColor: '#333',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor: '#fff',
    indicatorStyle: {
      backgroundColor: '#bc3b1f',
    },
    labelStyle: {
      fontSize: 12,
      fontFamily: 'montserrat-semibold',
    },
    style: {
      elevation: 0,
      backgroundColor: '#fff',
    }
  },
  tabBarPosition: 'top',
};

export default TabNavigator(RouteConfigs, TabNavigatorConfig);
