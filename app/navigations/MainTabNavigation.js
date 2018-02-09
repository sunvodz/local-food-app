import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import MapStackNavigation from './MapStackNavigation';
import NodesStackNavigation from './NodesStackNavigation';
import CartStackNavigation from './CartStackNavigation';
import UserStackNavigation from './UserStackNavigation';

const RouteConfigs = {
  MapStackNavigation: {
    screen: MapStackNavigation,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => (<Icon name='search' size={24} color={tintColor} />)
    })
  },
  NodesStackNavigation: {
    screen: NodesStackNavigation,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Nodes',
      tabBarIcon: ({ tintColor }) => (<Icon name='map-marker' size={24} color={tintColor} />)
    })
  },
  CartStackNavigation: {
    screen: CartStackNavigation,
    navigationOptions: ({ navigation }) => ({
    tabBarLabel: 'Cart',
      tabBarIcon: ({ tintColor }) => (<Icon name='shopping-cart' size={24} color={tintColor} />)
    })
  },
  UserStackNavigation: {
    screen: UserStackNavigation, // Use UserNavigation to get the stack navigation header
    navigationOptions: ({ navigation }) => ({
    tabBarLabel: 'User',
      tabBarIcon: ({ tintColor }) => (<Icon name='user' size={24} color={tintColor} />)
    })
  },
};

const TabNavigatorConfig = {
  animationEnabled: false,
  lazy: true,
  swipeEnabled: false,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: '#fff',
    inactiveTintColor: '#fff',
    activeBackgroundColor: '#bc3b1f',
    inactiveBackgroundColor: '#bc3b1f',
    indicatorStyle: {
      backgroundColor: '#fd962a',
    },
    style: {
      backgroundColor: '#bc3b1f',
    }
  },
  tabBarPosition: 'bottom',
};

export default TabNavigator(RouteConfigs, TabNavigatorConfig);
