import { StackNavigator } from 'react-navigation';

import Cart from 'app/screens/User/screens/Cart';

const routeConfig = {
  Cart: {
    screen: Cart,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Cart',
      }
    }
  },
};

const navigatorConfig = {};

export default StackNavigator(routeConfig, navigatorConfig);
