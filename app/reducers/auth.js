import { sharedActionTypes } from 'app/shared';
import * as loginActionTypes from 'app/screens/Auth/Login/actionTypes';
import * as signupActionTypes from 'app/screens/Auth/SignUp/actionTypes';
import { SWISH_SUCCESS } from 'app/screens/User/PayWithSwish/actionTypes';
import { STRIPE_SUCCESS } from 'app/screens/User/PayWithStripe/actionTypes';
import { FOLLOW_NODE_SUCCESS } from 'app/screens/Node/actionTypes';

function authReducer(state, action) {
  switch (action.type) {
    case signupActionTypes.CREATE_ACCOUNT_IN_PROGRESS:
    case signupActionTypes.CREATE_ACCOUNT_FAILED:
    case loginActionTypes.LOGIN_IN_PROGRESS:
    case loginActionTypes.LOGIN_SUCCESS:
    case loginActionTypes.LOGIN_FAILED:
    case sharedActionTypes.LOGOUT_SUCCESS:
      case sharedActionTypes.LOAD_USER_SUCCESS:
    case sharedActionTypes.LOAD_USER_FAILED:
    case sharedActionTypes.REFRESH_USER:
      return Object.assign({}, state, {
        user: action.user,
        loading: action.loading,
        refreshing: action.refreshing,
      });
      break;

    case sharedActionTypes.CREATE_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
        loading: action.loading,
        refreshing: action.refreshing,
      });
      break;

    case STRIPE_SUCCESS:
    case SWISH_SUCCESS:
    case FOLLOW_NODE_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
      });
      break;

    case sharedActionTypes.DONATE_NOTHING_STARTED:
      return Object.assign({}, state, {
        paymentInProgress: action.paymentInProgress,
      });
      break;

    case sharedActionTypes.DONATE_NOTHING_SUCCESS:
      return Object.assign({}, state, {
        paymentInProgress: action.paymentInProgress,
        user: action.user,
      });
      break;

    case sharedActionTypes.LOCATION_PERMISSION_GRANTED:
    case sharedActionTypes.LOCATION_PERMISSION_DENIED:
      return Object.assign({}, state, {
        locationPermission: action.locationPermission,
      });
      break;

    default:
      return Object.assign({}, state);
      break;
  }
}

export default authReducer;
