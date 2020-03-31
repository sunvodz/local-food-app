import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome as Icon } from '@expo/vector-icons';
import {
  createAppContainer
} from 'react-navigation';

import MapStackNavigation from './MapStackNavigation';
import UserStackNavigation from './UserStackNavigation';

import globalStyle from 'app/styles';

const RouteConfigs = {
  userStackNavigation: {
    screen: UserStackNavigation,
    navigationOptions: ({ navigation }) => {
      return {
        tabBarLabel: ({ tintColor }) => (<Icon name="user" style={{alignSelf: 'center'}} size={24} color={tintColor} />)
      };
    }
  },
  mapStackNavigation: {
    screen: MapStackNavigation,
    navigationOptions: ({ navigation }) => {
      return {
        tabBarLabel: ({ tintColor }) => (<Icon name='map-marker' style={{alignSelf: 'center'}} size={24} color={tintColor} />)
      };
    }
  },
};

const TabNavigatorConfig = {
  initialRouteName: 'mapStackNavigation',
  animationEnabled: false,
  lazy: true,
  swipeEnabled: false,
  tabBarOptions: {
    showIcon: false,
    showLabel: true,
    activeTintColor: globalStyle.primaryColor,
    inactiveTintColor: '#999',
    activeBackgroundColor: '#fafafa',
    inactiveBackgroundColor: '#fafafa',
    indicatorStyle: {
      backgroundColor: '#fafafa',
    },
    style: {
      alignItems: 'center',
      backgroundColor: '#fafafa',
    }
  },
  tabBarPosition: 'bottom',
};

export default createAppContainer(createBottomTabNavigator(RouteConfigs, TabNavigatorConfig));
