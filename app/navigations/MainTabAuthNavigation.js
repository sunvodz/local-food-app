import React from 'react';
import { TabNavigator } from 'react-navigation';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { NotificationsIcon } from 'app/containers';

import MapStackNavigation from './MapStackNavigation';
import UserStackNavigation from './UserStackNavigation';
import NotificationsStackNavigator from './NotificationsStackNavigator';

import globalStyle from 'app/styles';

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
      return <NotificationsStackNavigator screenProps={props.screenProps} />;
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
    activeTintColor: globalStyle.primaryColor,
    inactiveTintColor: '#999',
    activeBackgroundColor: globalStyle.primaryColor,
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
