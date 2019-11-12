import React from 'react';
import { TabNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { NotificationsIcon } from 'app/containers';
import {
  createAppContainer
} from 'react-navigation';

import MapStackNavigation from './MapStackNavigation';
import UserStackNavigation from './UserStackNavigation';
import NotificationsStackNavigator from './NotificationsStackNavigator';

import globalStyle from 'app/styles';

const RouteConfigs = {
  UserStackNavigation: {
    screen: UserStackNavigation,
    navigationOptions: ({ navigation }) => {
      return {
        tabBarLabel: ({ tintColor }) => (<Icon name="user" style={{alignSelf: 'center'}} size={24} color={tintColor} />)
      };
    }
  },
  MapStackNavigation: {
    screen: MapStackNavigation,
    navigationOptions: ({ navigation }) => {
      return {
        tabBarLabel: ({ tintColor }) => (<Icon name='map-marker' style={{alignSelf: 'center'}} size={24} color={tintColor} />)
      };
    }
  },
  Notifications: {
    screen: NotificationsStackNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        tabBarLabel: ({ tintColor }) => (<NotificationsIcon style={{alignSelf: 'center', justifyContent: 'center'}} size={24} color={tintColor} />),
      };
    }
  },
};

const TabNavigatorConfig = {
  // ...TabNavigator.Presets.AndroidTopTabs,
  initialRouteName: 'MapStackNavigation',
  animationEnabled: false,
  lazy: true,
  swipeEnabled: false,
  tabBarOptions: {
    showIcon: false,
    showLabel: true,
    activeTintColor: globalStyle.primaryColor,
    inactiveTintColor: '#999',
    inactiveBackgroundColor: '#fff',
    indicatorStyle: {
      backgroundColor: '#fff',
    },
    style: {
      padding: 10,
      backgroundColor: '#fff',
    }
  },
  tabBarPosition: 'bottom',
};

export default createAppContainer(createBottomTabNavigator(RouteConfigs, TabNavigatorConfig));
