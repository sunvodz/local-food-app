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

const CartNavigation = StackNavigator(routeConfig, navigatorConfig);

export default CartNavigation;
