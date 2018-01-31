import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import MapNavigation from './MapNavigation';
import Nodes from 'app/screens/User/screens/Nodes';
import Cart from 'app/screens/User/screens/Cart';
import UserNavigation from './UserNavigation';

const RouteConfigs = {
  Map: {
    screen: MapNavigation,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => (<Icon name='search' size={24} color={tintColor} />)
    })
  },
  Nodes: {
    screen: Nodes,
    navigationOptions: ({ navigation }) => ({
    tabBarLabel: 'Nodes',
      tabBarIcon: ({ tintColor }) => (<Icon name='map-marker' size={24} color={tintColor} />)
    })
  },
  Cart: {
    screen: Cart,
    navigationOptions: ({ navigation }) => ({
    tabBarLabel: 'Cart',
      tabBarIcon: ({ tintColor }) => (<Icon name='shopping-cart' size={24} color={tintColor} />)
    })
  },
  User: {
    screen: UserNavigation,
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
    activeBackgroundColor: '#fff',
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
