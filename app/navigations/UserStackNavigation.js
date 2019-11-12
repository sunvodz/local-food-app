import React from 'react';
import { StackNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

import Profile from 'app/screens/User/screens/Profile';
import Order from 'app/screens/User/screens/Order';
import Cart from 'app/screens/User/screens/Cart';
import Membership from 'app/screens/User/screens/Membership';
import DeleteAccount from 'app/screens/User/screens/DeleteAccount';
import Help from 'app/screens/User/screens/Help';
import PaymentSelect from 'app/screens/User/screens/PaymentSelect';
import PayWithSwish from 'app/screens/User/screens/PayWithSwish';
import ProfileTabNavigation from 'app/navigations/ProfileTabNavigation';
import AuthScreen from 'app/screens/Auth';
import { trans } from 'app/shared';
import style from 'app/styles';

import CartIcon from 'app/containers/CartIcon';


const routeConfig = {
  Profile: {
    screen: ProfileTabNavigation,
    navigationOptions: (props) => {
      // console.log(props.screenProps);

      let right = null;
      if (props.screenProps.auth.user) {
        right = <CartIcon size={20} color='#fff' style={{marginRight: 20}} onPress={() => props.navigation.navigate('Cart')} />
      }
      
      return {
        // header: null,
        title: trans('your_account', props.screenProps.lang),
        headerRight: right,
        headerLeftTitle: null,
      }
    },
  },
  Order: {
    screen: (props) => {
      return <Order navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: ({navigation}) => {
      return {
        header: null,
        headerLeftTitle: null,
      }
    }
  },
  Cart: {
    screen: (props) => {
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
  Membership: {
    screen: (props) => {
      return <Membership navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: ({navigation}) => {
      return {
        header: null,
        headerLeftTitle: null,
      }
    }
  },
  DeleteAccount: {
    screen: (props) => {
      return <DeleteAccount navigation={props.navigation} lang={props.screenProps.lang} />;
      },
      navigationOptions: ({navigation}) => {
      return {
        header: null,
        headerLeftTitle: null,
      }
    }
  },
  Help: {
    screen: (props) => {
      return <Help navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (navigation) => {
      return {
        header: null,
        headerLeftTitle: null,
      };
    }
  },
  paymentSelect: {
    screen: PaymentSelect,
    navigationOptions: (props) => {
      return {
        // title: trans('your_account', props.screenProps.lang),
        title: trans('membership', props.screenProps.lang),
        headerBackTitle: null,
      }
    },
  },
  payWithSwish: {
    screen: PayWithSwish,
    navigationOptions: {
      title: 'Swish',
      headerBackTitle: null,
    }
  },
  payWithStripe: {
    screen: Membership,
    navigationOptions: (props) => {
      return {
        title: 'Stripe',
        headerBackTitle: null,
      };
    }
  },
  Auth: {
    screen: AuthScreen
  }
};

const navigatorConfig = {
  defaultNavigationOptions: {
    headerStyle: style.stackNavigator.headerStyle,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeftTitle: null,
  },
  // initialRouteName: 'payWithSwish'
};

export default createStackNavigator(routeConfig, navigatorConfig);
export const UnauthorizedStackNavigator = createStackNavigator(routeConfig, {...navigatorConfig, initialRouteName: 'Auth'});
