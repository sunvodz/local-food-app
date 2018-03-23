import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from 'app/styles';

import Orders from 'app/screens/User/screens/Orders';
import Settings from 'app/screens/User/screens/Settings';

const RouteConfigs = {
  Orders: {
    screen: (navigation) => {
      return <Orders userStackNavigation={navigation.screenProps.userStackNavigation} />;
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      headerStyle: globalStyles.stackNavigator.headerStyle,
      headerTitleStyle: globalStyles.stackNavigator.headerTitleStyle,
    }
  },
};

const TabNavigatorConfig = {
  animationEnabled: true,
  lazy: true,
  swipeEnabled: true,
  tabBarOptions: {
    showIcon: false,
    showLabel: true,
    activeTintColor: '#333',
    inactiveTintColor: '#333',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor: '#fff',
    indicatorStyle: {
      backgroundColor: '#bc3b1f',
    },
    labelStyle: {
      fontSize: 12,
      fontFamily: 'montserrat-semibold',
    },
    style: {
      elevation: 0,
      backgroundColor: '#fff',
    }
  },
  tabBarPosition: 'top',
};

export default TabNavigator(RouteConfigs, TabNavigatorConfig);
