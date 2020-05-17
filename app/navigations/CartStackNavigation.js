import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Cart from 'app/screens/User/Cart';
import globalStyle from 'app/styles';
import { trans } from 'app/shared';

const Stack = createStackNavigator();

export default function cartStackNavigation({navigation, route}) {
  const lang = route.params.lang;

  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={({navigation, route}) => ({
        headerStyle: globalStyle.navigator.headerStyle,
        headerTintColor: globalStyle.navigator.headerTintColor,
        headerTitleStyle: globalStyle.navigator.headerTitleStyle,
        headerBackTitleVisible: false,
      })}
    >
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: trans('Shopping cart', lang)
        }}
      />
    </Stack.Navigator>
  );
}
