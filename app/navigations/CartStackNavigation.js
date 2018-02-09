import { StackNavigator } from 'react-navigation';
import globalStyles from 'app/styles';

import Cart from 'app/screens/User/screens/Cart';

const routeConfig = {
  Cart: {
    screen: Cart,
    navigationOptions: {
      title: 'Cart',
      headerStyle: globalStyles.stackNavigator.headerStyle
    }
  },
};

const navigatorConfig = {};

export default StackNavigator(routeConfig, navigatorConfig);
