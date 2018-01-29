import { combineReducers } from 'redux';

import alertReducer from 'app/containers/Alert/reducer';

import authReducer from 'app/screens/Auth/reducer';
import mapReducer from 'app/screens/Map/reducer';
import nodeReducer from 'app/screens/Node/reducer';
import productReducer from 'app/screens/Product/reducer';

import userReducer from 'app/screens/User/screens/Profile/reducer';
import cartReducer from 'app/screens/User/screens/Cart/reducer';
import ordersReducer from 'app/screens/User/screens/Orders/reducer';
import nodesReducer from 'app/screens/User/screens/Nodes/reducer';
import settingsReducer from 'app/screens/User/screens/Settings/reducer';
import notificationReducer from 'app/screens/User/screens/Notification/reducer';


const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  map: mapReducer,
  node: nodeReducer,
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
  nodes: nodesReducer,
  orders: ordersReducer,
  settings: settingsReducer,
  notification: notificationReducer,
  logger: function(state, action) {
    console.log(action.type);
    return Object.assign({}, state, {});
  }
});

export default rootReducer;
