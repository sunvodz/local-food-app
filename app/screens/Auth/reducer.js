import * as actionTypes from './actionTypes';
import { sharedActionTypes } from 'app/shared';

function authReducer(state, action) {
  switch (action.type) {
    case sharedActionTypes.ERROR:
      return Object.assign({}, state, {
        loading: action.loading,
      });
      break;

    case sharedActionTypes.LOGIN_IN_PROGRESS:
    case sharedActionTypes.LOGGED_IN:
    case sharedActionTypes.LOGGED_OUT:
      return Object.assign({}, state, {
        user: action.user,
        token: action.token,
        loading: action.loading,
      });
      break;

    case sharedActionTypes.SAVE_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
      });
      break;

    default:
      return Object.assign({}, state);
      break;
  }
}

export default authReducer;
