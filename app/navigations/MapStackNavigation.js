import React from 'react';
import { StackNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {View, Text} from 'react-native'

import Map from 'app/screens/Map';
import Node from 'app/screens/Node';
import Cart from 'app/screens/User/screens/Cart';
import Auth from 'app/screens/Auth';
import Membership from 'app/screens/User/screens/Membership';
import { trans } from 'app/shared';
import style from 'app/styles';
import CartIcon from 'app/containers/CartIcon'
import { FontAwesome as Icon } from '@expo/vector-icons';

const routeConfig = {
  Map: {
    screen: props => {
      return <Map navigation={props.navigation} lang={props.screenProps.lang} />
    },
    navigationOptions: (props) => {
        // header: null,
        // title: trans('your_account', props.screenProps.lang),
        let right = null;
      if (props.screenProps.auth.user) {
        right = <CartIcon size={20} color='#fff' style={{marginRight: 20}} onPress={() => props.navigation.navigate('Cart')} />
      }
      let left = null;
      
      if (props.screenProps.auth.user) {
        f = props.navigation.getParam('leftOnPress', null);
        left = <Icon style={{marginLeft: 20}} name={props.navigation.getParam('icon', 'globe')} size={24} color='#fff' onPress={f}/>;
      }
      
      return {
        // header: null,
        title: props.navigation.getParam('title'),
        headerRight: right,
        headerBackTitle: null,
        headerLeft: left
      }
    }
  },
  Node: {
    screen: props => {
      return <Node navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (props) => {
      return {
        header: null,
      }
    //   // title: trans('your_account', props.screenProps.lang),
    //   let right = null;
    // if (props.screenProps.auth.user) {
    //   right = <CartIcon size={20} color='#fff' style={{marginRight: 20}} onPress={() => props.navigation.navigate('Cart')} />
    // }
    // // console.log(props);
    
    
    // return {
    //   // header: null,
    //   // title: props.navigation.getParam('title'),
    //   headerRight: right,
    //   headerBackTitle: null,
    //   headerTitle: (
    //     <View>
    //       <Text>{props.navigation.getParam('title')}</Text>
    //       <Text>{props.navigation.getParam('subtitle')}</Text>
    //     </View>
    //   )
    // }
    }
  },
  Cart: {
    screen: props => {
      return <Cart navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (props) => {
      return {
        // header: null,
        title: trans('cart', props.screenProps.lang),
        headerLeftTitle: null,
        // header: {
        //   // backTitle: null,
        // },
      }
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
  defaultNavigationOptions: (props) => {
    const navigation = props.navigation;

    // let right = null;
    // if (navigation.state.params && navigation.state.params.right) {
    //   right = navigation.state.params.right;
    // }
    // if (props.right === true && props.auth.user) {
    //   right = <CartIcon style={{paddingRight: 20}} size={20} color='#fff' onPress={() => navigation.navigate('Cart')}></CartIcon>;
    // } else if (props.right) {
    //   right = props.right;
    // }

    return {
      headerStyle: style.stackNavigator.headerStyle,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      // headerRight: right
    }
  }
};

export default createStackNavigator(routeConfig, navigatorConfig);
