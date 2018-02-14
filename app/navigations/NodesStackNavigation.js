import React from 'react';
import { StackNavigator } from 'react-navigation';
import globalStyles from 'app/styles';

import Nodes from 'app/screens/User/screens/Nodes';
import Node from 'app/screens/Node';
import Product from 'app/screens/Product';
import DateFilter from 'app/screens/Node/containers/DateFilter';

const routeConfig = {
  Nodes: {
    screen: Nodes,
    navigationOptions: {
      title: 'Your Nodes',
      headerStyle: globalStyles.stackNavigator.headerStyle,
      headerTitleStyle: globalStyles.stackNavigator.headerTitleStyle,
    }
  },
  Node: {
    screen: Node,
    navigationOptions: ({ navigation }) => {
      const node = navigation.state.params;

      return {
        title: node.name,
        headerRight: <DateFilter nodeId={node.id} />,
        headerTitleStyle: {
          fontFamily: 'montserrat-bold',
          fontWeight: 'normal',
          fontSize: 20,
        },
        headerStyle: globalStyles.stackNavigator.headerStyle,
        headerTitleStyle: globalStyles.stackNavigator.headerTitleStyle,
      };
    }
  },
  Product: {
    screen: Product,
    navigationOptions: ({ navigation }) => {
      const { product } = navigation.state.params;

      return {
        title: product.name,
        headerStyle: globalStyles.stackNavigator.headerStyle,
        headerTitleStyle: globalStyles.stackNavigator.headerTitleStyle,
      };
    }
  }
};

const navigatorConfig = {};

export default StackNavigator(routeConfig, navigatorConfig);
