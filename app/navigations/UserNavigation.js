import { StackNavigator } from 'react-navigation';

import Profile from 'app/screens/User/screens/Profile';
import Orders from 'app/screens/User/screens/Orders';
import OrderDetails from 'app/screens/User/screens/OrderDetails';
import Settings from 'app/screens/User/screens/Settings';

const routeConfig = {
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
		})
  },
  Orders: {
    screen: Orders,
    navigationOptions: ({ navigation }) => ({
      title: 'Orders',
      headerBackTitle: 'Profile',
		})
  },
  OrderDetails: {
    screen: OrderDetails,
    navigationOptions: ({ navigation }) => ({
      title: 'Order',
      headerBackTitle: 'Orders',
		})
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
			title: 'Settings',
		})
  },
};

const navigatorConfig = {};

const UserNavigation = StackNavigator(routeConfig, navigatorConfig);

export default UserNavigation;
