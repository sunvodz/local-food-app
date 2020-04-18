import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import globalStyles from 'app/styles';

import Orders from 'app/screens/User/screens/Orders';
import Settings from 'app/screens/User/screens/Settings';

import { trans } from 'app/shared';

const RouteConfigs = {
  orders: {
    screen: (props) => {
      return <Orders navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (props) => {
      return {
        tabBarLabel: trans('orders', props.screenProps.lang),
        headerLeftTitle: null,
      };
    }
  },
  settings: {
    screen: (props) => {
      return <Settings navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (props) => {
      return {
        tabBarLabel: trans('Settings', props.screenProps.lang),
        headerLeftTitle: null,
      };
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
      backgroundColor: globalStyles.primaryColor,
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
  headerLeftTitle: null,
};

export default createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);
