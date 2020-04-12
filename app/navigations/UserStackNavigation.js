import React from 'react';
import { createStackNavigator } from 'react-navigation-stack'

import Order from 'app/screens/User/screens/Order';
import Cart from 'app/screens/User/screens/Cart';
import DeleteAccount from 'app/screens/User/screens/DeleteAccount';
import Help from 'app/screens/User/screens/Help';
import PaymentSelect from 'app/screens/User/screens/PaymentSelect';
import PayWithStripe from 'app/screens/User/screens/PayWithStripe';
import PayWithSwish from 'app/screens/User/screens/PayWithSwish';
import ProfileTabNavigation from 'app/navigations/ProfileTabNavigation';
import Auth from 'app/screens/Auth';
import { trans } from 'app/shared';
import style from 'app/styles';

import CartIcon from 'app/containers/CartIcon';

const routeConfig = {
  profile: {
    screen: ProfileTabNavigation,
    navigationOptions: (props) => {
      let right = null;
      if (props.screenProps.auth.user) {
        right = <CartIcon size={20} color='#fff' style={{marginRight: 20}} onPress={() => props.navigation.navigate('cart')} />
      }

      return {
        title: trans('Your account', props.screenProps.lang),
        headerRight: right,
        headerLeftTitle: null,
        headerBackTitle: null,
      }
    },
  },
  order: {
    screen: (props) => {
      return <Order navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: ({navigation}) => {
      return {
        header: null,
        headerLeftTitle: null,
        headerBackTitle: null,
      }
    }
  },
  cart: {
    screen: (props) => {
      return <Cart navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (props) => {
      return {
        title: trans('Cart', props.screenProps.lang),
        headerLeftTitle: null,
        headerBackTitle: null,
      }
    }
  },
  deleteAccount: {
    screen: (props) => {
      return <DeleteAccount navigation={props.navigation} lang={props.screenProps.lang} />;
      },
      navigationOptions: ({navigation}) => {
      return {
        header: null,
        headerLeftTitle: null,
        headerBackTitle: null,
      }
    }
  },
  help: {
    screen: (props) => {
      return <Help navigation={props.navigation} lang={props.screenProps.lang} />;
    },
    navigationOptions: (navigation) => {
      return {
        header: null,
        headerLeftTitle: null,
        headerBackTitle: null,
      };
    }
  },
  paymentSelect: {
    screen: PaymentSelect,
    navigationOptions: (props) => {
      return {
        title: trans('Donation', props.screenProps.lang),
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
    screen: PayWithStripe,
    navigationOptions: (props) => {
      return {
        title: 'Credit card',
        headerBackTitle: null,
      };
    }
  },
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
};

export default createStackNavigator(routeConfig, navigatorConfig);
export const UnauthorizedStackNavigator = createStackNavigator(routeConfig, {...navigatorConfig, initialRouteName: 'profile'});
