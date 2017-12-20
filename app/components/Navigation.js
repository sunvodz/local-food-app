import React, {Component} from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MapScreen from 'app/screens/Map';
import UserNodesScreen from 'app/screens/NodeList';
import NotificationScreen from 'app/screens/Notification';
import UserNavigation from 'app/screens/User';

const RouteConfigs = {
  MapScreen: {
    screen: MapScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Map',
      tabBarIcon: ({ tintColor }) => (<Icon name='explore' size={24} color={tintColor} />)
		})
  },
  UserNodesScreen: {
    screen: UserNodesScreen,
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
  User: {
    screen: UserNavigation,
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
