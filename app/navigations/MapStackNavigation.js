import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Map from 'app/screens/Map';
import Node from 'app/screens/Node';
import Cart from 'app/screens/User/screens/Cart';
import Nodes from 'app/screens/User/screens/Nodes';

import SmallHeader from './headers/SmallHeader';

const routeConfig = {
  Map: {
    screen: Map,
    navigationOptions: ({ navigation }) => {
      return {
        header: null,
      };
    }
  },
  Node: {
    screen: Node,
    navigationOptions: ({ navigation }) => {
      const node = navigation.state.params;

      return {
        header: <SmallHeader title={node.name} left right navigation={navigation} />,
      };
    }
  },
  Cart: {
    screen: Cart,
    navigationOptions: ({ navigation }) => {
      return {
        header: <SmallHeader title='Cart' left navigation={navigation} />
      };
    }
  },
};

const navigatorConfig = {
  headerMode: 'float',
  initialRouteName: 'Map',
};

export default StackNavigator(routeConfig, navigatorConfig);
