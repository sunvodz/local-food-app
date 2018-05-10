import { combineReducers } from 'redux';

import alertReducer from 'app/containers/Alert/reducer';

import authReducer from 'app/screens/Auth/reducer';
import mapReducer from 'app/screens/Map/reducer';
import nodeReducer from 'app/screens/Node/reducer';

import userReducer from 'app/screens/User/screens/Profile/reducer';
import cartReducer from 'app/screens/User/screens/Cart/reducer';
import ordersReducer from 'app/screens/User/screens/Orders/reducer';
import orderReducer from 'app/screens/User/screens/Order/reducer';
import nodesReducer from 'app/screens/User/screens/Nodes/reducer';
import settingsReducer from 'app/screens/User/screens/Settings/reducer';
import notificationsReducer from 'app/screens/User/screens/Notifications/reducer';
import membershipReducer from 'app/screens/User/screens/Membership/reducer';

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  membership: membershipReducer,
  map: mapReducer,
  node: nodeReducer,
  cart: cartReducer,
  user: userReducer,
  nodes: nodesReducer,
  orders: ordersReducer,
  order: orderReducer,
  settings: settingsReducer,
  notifications: notificationsReducer,
  logger: function(state, action) {
    console.log(action.type);
    return Object.assign({}, state, {});
  }
});

export default rootReducer;
