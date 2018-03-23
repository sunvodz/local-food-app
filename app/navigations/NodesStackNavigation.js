import React from 'react';
import { StackNavigator } from 'react-navigation';

import Nodes from 'app/screens/User/screens/Nodes';
import Node from 'app/screens/Node';
import SmallHeader from './headers/SmallHeader';

const routeConfig = {
  Nodes: {
    screen: Nodes,
    navigationOptions: ({navigation}) => {
      return {
        header: <SmallHeader title='Your nodes' right navigation={navigation} />,
      }
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
};

const navigatorConfig = {
  initialRouteName: 'Nodes',
};

export default StackNavigator(routeConfig, navigatorConfig);
