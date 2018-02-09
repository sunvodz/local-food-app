import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Orders from 'app/screens/User/screens/Orders';
import OrderDetails from 'app/screens/User/screens/OrderDetails';
import Settings from 'app/screens/User/screens/Settings';

const RouteConfigs = {
  Orders: {
    screen: (navigation) => {
      return <Orders userStackNavigation={navigation.screenProps.userStackNavigation} />;
    },
    navigationOptions: {
      header: null,
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
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
      backgroundColor: '#fd962a',
    },
    labelStyle: {
      fontSize: 14,
      fontFamily: 'montserrat-medium',
    },
    style: {
      backgroundColor: '#fff',
    }
  },
  tabBarPosition: 'top',
};

export default TabNavigator(RouteConfigs, TabNavigatorConfig);
