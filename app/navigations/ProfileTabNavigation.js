import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import globalStyles from 'app/styles';
import Orders from 'app/screens/User/Orders';
import Settings from 'app/screens/User/Settings';
import { trans } from 'app/shared';

const MaterialTopTabNavigator = createMaterialTopTabNavigator();
const MaterialTopTabNavigatorConfig = {
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
};

export default function profileTabNavigator({navigation, route}) {
  const lang = route.params.lang;

  return (
    <MaterialTopTabNavigator.Navigator tabBarOptions={MaterialTopTabNavigatorConfig.tabBarOptions}>
      <MaterialTopTabNavigator.Screen
        name="Orders"
        component={Orders}
        options={{
          title: trans('Orders', lang)
        }}
      />
      <MaterialTopTabNavigator.Screen
        name="Settings"
        component={Settings}
        options={{
          title: trans('Settings', lang)
        }}
      />
    </MaterialTopTabNavigator.Navigator>
  );
}
