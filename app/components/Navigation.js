import { TabNavigator } from 'react-navigation';

import UserScreen from '../screens/user';
import MapScreen from '../screens/map';

const RouteConfigs = {
  UserScreen: {
    screen: UserScreen,
  },
  MapScreen: {
    screen: MapScreen,
  }
};

const TabNavigatorConfig = {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#ffffff',
  }
};


export default TabNavigator(RouteConfigs, TabNavigatorConfig);
