import React from 'react';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Map from 'app/screens/Map';
import Node from 'app/screens/Node';
import Cart from 'app/screens/User/screens/Cart';

import { trans } from 'app/shared';

const routeConfig = {
  Map: {
    screen: props => {
      return <Map navigation={props.navigation} lang={props.screenProps.lang} />
    },
    navigationOptions: ({ navigation }) => {
      return {
        header: null,
      };
    }
  },
  Node: {
    screen: props => {
      return <Node navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: ({ navigation }) => {
      return {
        header: null,
      };
    }
  },
  Cart: {
    screen: props => {
      return <Cart navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: ({ navigation }) => {
      return {
        header: null,
      };
    }
  },
};

const navigatorConfig = {
  headerMode: 'float',
  initialRouteName: 'Map',
};

export default StackNavigator(routeConfig, navigatorConfig);
