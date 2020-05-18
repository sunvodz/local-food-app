import { combineReducers } from 'redux';

import alertReducer from 'app/containers/Alert/reducer';

import authReducer from 'app/screens/Auth/reducer';
import mapReducer from 'app/screens/Map/reducer';
import nodeReducer from 'app/screens/Node/reducer';
import systemReducer from './system';

import cartReducer from 'app/screens/User/Cart/reducer';
import ordersReducer from 'app/screens/User/Orders/reducer';
import orderReducer from 'app/screens/User/Order/reducer';
import nodesReducer from 'app/screens/User/Nodes/reducer';
import settingsReducer from 'app/screens/User/Settings/reducer';
import stripeReducer from 'app/screens/User/PayWithStripe/reducer';
import swishReducer from 'app/screens/User/PayWithSwish/reducer';

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  map: mapReducer,
  node: nodeReducer,
  cart: cartReducer,
  nodes: nodesReducer,
  orders: ordersReducer,
  order: orderReducer,
  settings: settingsReducer,
  stripe: stripeReducer,
  swish: swishReducer,
  system: systemReducer,
  logger: function(state, action) {
    // console.log(action.type);
    return Object.assign({}, state, {});
  }
});

export default rootReducer;
