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
      tabBarLabel: ({ tintColor }) => (<Icon name='search' size={24} color={tintColor} />)
    })
  },
  NodesStackNavigation: {
    screen: NodesStackNavigation,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => (<Icon name='map-marker' size={24} color={tintColor} />)
    })
  },
  CartStackNavigation: {
    screen: CartStackNavigation,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => (<Icon name='shopping-basket' size={24} color={tintColor} />)
    })
  },
  UserStackNavigation: {
    screen: UserStackNavigation, // Use UserNavigation to get the stack navigation header
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ tintColor }) => (<Icon name='user' size={24} color={tintColor} />)
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
