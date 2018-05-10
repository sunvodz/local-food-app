import React from 'react';
import { StackNavigator } from 'react-navigation';
import moment from 'moment';

import Profile from 'app/screens/User/screens/Profile';
import Order from 'app/screens/User/screens/Order';
import Membership from 'app/screens/User/screens/Membership';
import DeleteAccount from 'app/screens/User/screens/DeleteAccount';
import SmallHeader from './headers/SmallHeader';

const routeConfig = {
  Profile: {
    screen: (navigation) => {
      return <Profile screenProps={{ userStackNavigation: navigation }} />;
    },
    navigationOptions: ({navigation}) => {
      return {
        header: <SmallHeader title='Your account' right navigation={navigation} />,
      }
    }
  },
  Order: {
    screen: Order,
    navigationOptions: ({navigation}) => {
      const order = navigation.state.params;
      const orderItem = order.order_item_relationship[0];
      const orderDate = order.order_date_relationship[0];

      let title = 'Order ' + order.ref;
      let pickup = `Pickup on ${moment(orderDate.date.date).format('YYYY-MM-DD')} ${orderItem.node.delivery_time}`;

      return {
        header: <SmallHeader title={title} sub={pickup} left navigation={navigation} />,
      }
    }
  },
  Membership: {
    screen: Membership,
    navigationOptions: ({navigation}) => {
      return {
        header: <SmallHeader title='Membership' left navigation={navigation} />,
      }
    }
  },
  DeleteAccount: {
    screen: DeleteAccount,
    navigationOptions: ({navigation}) => {
      return {
        header: <SmallHeader title='Delete Account' left navigation={navigation} />,
      }
    }
  },
};

const navigatorConfig = {};

export default StackNavigator(routeConfig, navigatorConfig);
