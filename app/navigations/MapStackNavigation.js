import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import Map from 'app/screens/Map';
import Node from 'app/screens/Node';
import Nodes from 'app/screens/User/Nodes';
import { FontAwesome as Icon } from '@expo/vector-icons';
import globalStyle from 'app/styles';
import { trans } from 'app/shared';

const Stack = createStackNavigator();

export default function mapStackNavigation({navigation, route}) {
  const lang = route.params.lang;
  return (
    <Stack.Navigator
      initialRouteName="Nodes"
      screenOptions={({navigation, route}) => ({
        headerStyle: globalStyle.navigator.headerStyle,
        headerTintColor: globalStyle.navigator.headerTintColor,
        headerTitleStyle: globalStyle.navigator.headerTitleStyle,
        headerBackTitleVisible: false,
      })}
    >
      <Stack.Screen
        name="Map"
        component={Map}
        options={({navigation, route}) => {
          return {
            title: trans('Find nodes', lang),
            headerLeft: () => (
              <Icon style={{marginLeft: 15}} name='list' size={24} color='#fff' onPress={() => navigation.navigate('Nodes')} />
            ),
          }
        }}
      />
      <Stack.Screen
        name="Nodes"
        component={Nodes}
        options={({navigation, route}) => {
          return {
            title: trans('Your nodes', lang),
            headerLeft: () => (
              <Icon style={{marginLeft: 15}} name='globe' size={24} color='#fff' onPress={() => navigation.navigate('Map')} />
            ),
          }
        }}
      />
      <Stack.Screen
        name="Node"
        component={Node}
        options={{
          title: trans('Node', lang),
        }}
      />
    </Stack.Navigator>
  );
}
