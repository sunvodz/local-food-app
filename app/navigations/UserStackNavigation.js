import React from 'react';
import { StackNavigator } from 'react-navigation';

import Profile from 'app/screens/User/screens/Profile';
import Order from 'app/screens/User/screens/Order';
import SmallHeader from './headers/SmallHeader';

const routeConfig = {
  Profile: {
    screen: (navigation) => {
      return <Profile screenProps={{ userStackNavigation: navigation }} />;
    },
    navigationOptions: ({navigation}) => {
      return {
        header: <SmallHeader title='Your account' navigation={navigation} />,
      }
    }
  },
  Order: {
    screen: Order,
    navigationOptions: ({navigation}) => {
      const order = navigation.state.params;
      let title = 'Order ' + order.ref;

      return {
        header: <SmallHeader title={title} navigation={navigation} />,
      }
    }
  },
};

const navigatorConfig = {};

export default StackNavigator(routeConfig, navigatorConfig);
