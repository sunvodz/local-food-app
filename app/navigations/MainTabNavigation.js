import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { MapIcon, NodesIcon, NotificationsIcon, CartIcon, UserIcon } from './icons';

import MapStackNavigation from './MapStackNavigation';
import NodesStackNavigation from './NodesStackNavigation';
import Notifications from 'app/screens/User/screens/Notifications';
import UserStackNavigation from './UserStackNavigation';

const RouteConfigs = {
  MapStackNavigation: {
    screen: MapStackNavigation,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => (<MapIcon size={24} color={tintColor} />)
    })
  },
  NodesStackNavigation: {
    screen: NodesStackNavigation,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => (<NodesIcon size={24} color={tintColor} />)
    })
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => (<NotificationsIcon size={24} color={tintColor} />)
    })
  },
  UserStackNavigation: {
    screen: UserStackNavigation, // Use UserNavigation to get the stack navigation header
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => (<UserIcon size={24} color={tintColor} />)
    })
  },
};

const TabNavigatorConfig = {
  animationEnabled: false,
  lazy: true,
  swipeEnabled: false,
  tabBarOptions: {
    showIcon: false,
    showLabel: true,
    activeTintColor: '#bf360c',
    inactiveTintColor: '#999',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor: '#fff',
    indicatorStyle: {
      backgroundColor: '#fff',
    },
    style: {
      padding: 5,
      backgroundColor: '#fff',
    }
  },
  tabBarPosition: 'bottom',
};

export default TabNavigator(RouteConfigs, TabNavigatorConfig);
