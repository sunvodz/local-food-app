import { combineReducers } from 'redux';

import authReducer from '../screens/Auth/reducer';
import mapReducer from '../screens/Map/reducer';
import nodeReducer from '../screens/Node/reducer';
import notificationReducer from '../screens/Notification/reducer';
import userReducer from '../screens/User/reducer';
import userOrdersReducer from '../screens/UserOrders/reducer';
import userSettingsReducer from '../screens/UserSettings/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  map: mapReducer,
  node: nodeReducer,
  notification: notificationReducer,
  user: userReducer,
  userOrders: userOrdersReducer,
  userSettings: userSettingsReducer,
  logger: function userReducer(state, action) {
    console.log(action.type);
    return Object.assign({}, state, {});
  }
});

export default rootReducer;
