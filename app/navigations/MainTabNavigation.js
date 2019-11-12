import React from 'react';
import { TabNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome as Icon } from '@expo/vector-icons';
import {
  createAppContainer
} from 'react-navigation';

import MapStackNavigation from './MapStackNavigation';
import UserStackNavigation from './UserStackNavigation';
import ProfileScreen from 'app/screens/User/screens/Profile'

import globalStyle from 'app/styles';

const RouteConfigs = {
  UserStackNavigation: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => {
      return {
        tabBarLabel: ({ tintColor }) => (<Icon name='user' size={24} style={{alignSelf: 'center'}} color={tintColor} />),
      };
    },
    defaultNavigationOptions: {
      headerStyle: globalStyle.stackNavigator.headerStyle,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
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
    activeBackgroundColor: '#fafafa',
    inactiveBackgroundColor: '#fafafa',
    indicatorStyle: {
      backgroundColor: '#fafafa',
    },
    style: {
      padding: 15,
      backgroundColor: '#fafafa',
    }
  },
  // defaultNavigationOptions: {
  //   tabBarIcon: {

  //   }
  // }
  tabBarPosition: 'bottom',
};

export default createAppContainer(createBottomTabNavigator(RouteConfigs, TabNavigatorConfig));
