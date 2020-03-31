import { combineReducers } from 'redux';

import alertReducer from 'app/containers/Alert/reducer';

import authReducer from './auth';
import mapReducer from './map';
import nodeReducer from './node';

import userReducer from 'app/screens/User/screens/Profile/reducer';
import cartReducer from 'app/screens/User/screens/Cart/reducer';
import ordersReducer from 'app/screens/User/screens/Orders/reducer';
import orderReducer from 'app/screens/User/screens/Order/reducer';
import nodesReducer from 'app/screens/User/screens/Nodes/reducer';
import settingsReducer from 'app/screens/User/screens/Settings/reducer';
import stripeReducer from 'app/screens/User/screens/PayWithStripe/reducer';
import swishReducer from 'app/screens/User/screens/PayWithSwish/reducer';

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  map: mapReducer,
  node: nodeReducer,
  cart: cartReducer,
  user: userReducer,
  nodes: nodesReducer,
  orders: ordersReducer,
  order: orderReducer,
  settings: settingsReducer,
  stripe: stripeReducer,
  swish: swishReducer,
  logger: function(state, action) {
    console.log(action.type);
    return Object.assign({}, state, {});
  }
});

export default rootReducer;
