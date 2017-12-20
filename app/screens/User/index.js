import { StackNavigator } from 'react-navigation';


import Profile from './screens/Profile';
import OrdersList from './screens/OrdersList';
import OrderDetails from './screens/OrderDetails';
import Settings from './screens/Settings';

const routeConfig = {
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
		})
  },
  OrdersList: {
    screen: OrdersList,
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

const navigatorConfig = {

};

const UserNavigation = StackNavigator(routeConfig, navigatorConfig);

export default UserNavigation;
