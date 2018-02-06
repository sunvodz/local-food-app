import { StackNavigator } from 'react-navigation';

import Nodes from 'app/screens/User/screens/Nodes';

const routeConfig = {
  Nodes: {
    screen: Nodes,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Your Nodes',
      }
    }
  },
};

const navigatorConfig = {};

const NodesNavigation = StackNavigator(routeConfig, navigatorConfig);

export default NodesNavigation;
