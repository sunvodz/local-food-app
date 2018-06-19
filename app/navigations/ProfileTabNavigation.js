import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyles from 'app/styles';

import Orders from 'app/screens/User/screens/Orders';
import Settings from 'app/screens/User/screens/Settings';

import { trans } from 'app/shared';

const RouteConfigs = {
  Orders: {
    screen: (props) => {
      return <Orders userStackNavigation={props.screenProps.userStackNavigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (props) => {
      return {
        tabBarLabel: trans('orders', props.screenProps.lang),
      };
    }
  },
  Settings: {
    screen: (props) => {
      return <Settings userStackNavigation={props.screenProps.userStackNavigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (props) => {
      return {
        tabBarLabel: trans('settings', props.screenProps.lang),
      };
    }
  },
};

const TabNavigatorConfig = {
  ...TabNavigator.Presets.AndroidTopTabs,
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
      backgroundColor: '#ba2000',
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
