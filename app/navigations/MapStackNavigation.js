import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Map from 'app/screens/Map';
import Node from 'app/screens/Node';
import Product from 'app/screens/Product';

import globalStyles from 'app/styles';

const style = globalStyles.stackNavigator;

const routeConfig = {
  Map: {
    screen: Map,
    navigationOptions: {
      title: 'Find nodes',
      headerStyle: style.headerStyle,
      headerTitleStyle: style.headerTitleStyle,
      headerTintColor: style.headerTintColor,
    }
  },
  Node: {
    screen: Node,
    navigationOptions: ({ navigation }) => {
      const node = navigation.state.params;

      return {
        headerTitle: node.name,
        headerStyle: style.headerStyle,
        headerTitleStyle: style.headerTitleStyle,
        headerTintColor: style.headerTintColor,
      };
    }
  },
  Product: {
    screen: Product,
    navigationOptions: ({ navigation }) => {
      const { product } = navigation.state.params;

      return {
        headerTitle: product.name,
        headerStyle: style.headerStyle,
        headerTitleStyle: style.headerTitleStyle,
        headerTintColor: style.headerTintColor,
      };
    }
  }
};

const navigatorConfig = {
  headerMode: 'float',
};

export default StackNavigator(routeConfig, navigatorConfig);
