import React from 'react';
import { StackNavigator } from 'react-navigation';

import Map from 'app/screens/Map';
import Node from 'app/screens/Node';
import Cart from 'app/screens/User/screens/Cart';
import Auth from 'app/screens/Auth';
import Membership from 'app/screens/User/screens/Membership';

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
  Auth: {
    screen: props => {
      return <Auth navigation={props.navigation} lang={props.screenProps.lang} />
    },
    navigationOptions: ({ navigation }) => {
      return {
        header: null,
      };
    }
  },
  Membership: {
    screen: props => {
      return <Membership navigation={props.navigation} lang={props.screenProps.lang} />
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
