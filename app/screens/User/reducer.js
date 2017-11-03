import * as actionTypes from './actionTypes';
import { sharedActionTypes } from '../../shared';

function userReducer(state, action) {
  switch (action.type) {
    case sharedActionTypes.ERROR:
    case sharedActionTypes.RESET_ALERT:
      return Object.assign({}, state, {
        alert: action.alert,
        loading: action.loading,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default userReducer;
