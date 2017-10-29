import React, {Component} from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MapScreen from '../screens/Map';
import NodeScreen from '../screens/Node';
import NotificationScreen from '../screens/Notification';
import UserScreen from '../screens/User';

const RouteConfigs = {
  MapScreen: {
    screen: MapScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => (<Icon name='explore' size={24} color={tintColor} />)
		})
  },
  NodeScreen: {
    screen: NodeScreen,
    navigationOptions: ({ navigation }) => ({
			tabBarLabel: 'Nodes',
      tabBarIcon: ({ tintColor }) => (<Icon name='place' size={24} color={tintColor} />)
		})
  },
  NotificationScreen: {
    screen: NotificationScreen,
    navigationOptions: ({ navigation }) => ({
			tabBarLabel: 'Notifications',
      tabBarIcon: ({ tintColor }) => (<Icon name='announcement' size={24} color={tintColor} />)
		})
  },
  UserScreen: {
    screen: UserScreen,
    navigationOptions: ({ navigation }) => ({
			tabBarLabel: 'User',
      tabBarIcon: ({ tintColor }) => (<Icon name='person' size={24} color={tintColor} />)
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
    activeTintColor: '#333333',
    activeBackgroundColor: '#fff',
    inactiveTintColor: '#333333',
    inactiveBackgroundColor: '#fff',
    indicatorStyle: {
      backgroundColor: '#fff',
    },
    style: {
      backgroundColor: '#fff',
    }
  },
  tabBarPosition: 'bottom',
};

export default TabNavigator(RouteConfigs, TabNavigatorConfig);
