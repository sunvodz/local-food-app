import React from 'react';
import { StackNavigator } from 'react-navigation';
import globalStyles from 'app/styles';

import Map from 'app/screens/Map';
import Node from 'app/screens/Node';
import Product from 'app/screens/Product';
import DateFilter from 'app/screens/Node/containers/DateFilter';

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
        title: node.name,
        headerRight: <DateFilter nodeId={node.id} />,
        headerTitleStyle: style.headerTitleStyle,
        headerStyle: style.headerStyle,
        headerTintColor: style.headerTintColor,
      };
    }
  },
  Product: {
    screen: Product,
    navigationOptions: ({ navigation }) => {
      const { product } = navigation.state.params;

      return {
        title: product.name,
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
