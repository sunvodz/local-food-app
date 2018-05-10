import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NodesIcon, NotificationsIcon, UserIcon } from './icons';

import MapStackNavigation from './MapStackNavigation';
import NodesStackNavigation from './NodesStackNavigation';
import Notifications from 'app/screens/User/screens/Notifications';
import UserStackNavigation from './UserStackNavigation';

const RouteConfigs = {
  UserStackNavigation: {
    screen: UserStackNavigation, // Use UserNavigation to get the stack navigation header
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => (<UserIcon size={24} color={tintColor} />)
    })
  },
  MapStackNavigation: {
    screen: MapStackNavigation,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => (<Icon name='map-marker' size={24} color={tintColor} />)
    })
  },
  Notifications: {
    screen: Notifications,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => (<NotificationsIcon size={24} color={tintColor} />)
    })
  },
};

const TabNavigatorConfig = {
  ...TabNavigator.Presets.AndroidTopTabs,
  initialRouteName: 'MapStackNavigation',
  animationEnabled: false,
  lazy: true,
  swipeEnabled: false,
  tabBarOptions: {
    showIcon: false,
    showLabel: true,
    activeTintColor: '#bf360c',
    inactiveTintColor: '#999',
    activeBackgroundColor: '#fafafa',
    inactiveBackgroundColor: '#fafafa',
    indicatorStyle: {
      backgroundColor: '#fafafa',
    },
    style: {
      padding: 5,
      backgroundColor: '#fafafa',
    }
  },
  tabBarPosition: 'bottom',
};

export default TabNavigator(RouteConfigs, TabNavigatorConfig);
