import { combineReducers } from 'redux';

import authReducer from 'app/screens/Auth/reducer';
import mapReducer from 'app/screens/Map/reducer';
import nodeReducer from 'app/screens/Node/reducer';
import notificationReducer from 'app/screens/Notification/reducer';
import userReducer from 'app/screens/User/screens/Profile/reducer';
import ordersReducer from 'app/screens/User/screens/Orders/reducer';
import settingsReducer from 'app/screens/User/screens/Settings/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  map: mapReducer,
  node: nodeReducer,
  notification: notificationReducer,
  user: userReducer,
  orders: ordersReducer,
  settings: settingsReducer,
  logger: function(state, action) {
    console.log(action.type);
    return Object.assign({}, state, {});
  }
});

export default rootReducer;
