import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NotificationsIcon } from 'app/containers';

import MapStackNavigation from './MapStackNavigation';
import Notifications from 'app/screens/User/screens/Notifications';
import UserStackNavigation from './UserStackNavigation';

const RouteConfigs = {
  UserStackNavigation: {
    screen: props => {
      return <UserStackNavigation screenProps={props.screenProps} />; // Use UserNavigation to get the stack navigation header
    },
    navigationOptions: ({ navigation }) => {
      return {
        tabBarLabel: ({ tintColor }) => (<Icon name="user" size={24} color={tintColor} />)
      };
    }
  },
  MapStackNavigation: {
    screen: props => {
      return <MapStackNavigation screenProps={props.screenProps} />;
    },
    navigationOptions: ({ navigation }) => {
      return {
        tabBarLabel: ({ tintColor }) => (<Icon name='map-marker' size={24} color={tintColor} />)
      };
    }
  },
  Notifications: {
    screen: props => {
      return <Notifications screenProps={props.screenProps} lang={props.screenProps.lang} />;
    },
    navigationOptions: ({ navigation }) => {
      return {
        tabBarLabel: ({ tintColor }) => (<NotificationsIcon size={24} color={tintColor} />)
      };
    }
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
