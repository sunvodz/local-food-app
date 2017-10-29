import { combineReducers } from 'redux';

import authReducer from '../screens/Auth/reducer';
import mapReducer from '../screens/Map/reducer';
import nodeReducer from '../screens/Node/reducer';
import notificationReducer from '../screens/Notification/reducer';
import userReducer from '../screens/User/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  map: mapReducer,
  node: nodeReducer,
  notification: notificationReducer,
  user: userReducer,
});

export default rootReducer;
