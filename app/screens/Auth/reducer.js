import { sharedActionTypes } from 'app/shared';

function authReducer(state, action) {
  switch (action.type) {
    case sharedActionTypes.CREATE_ACCOUNT_IN_PROGRESS:
    case sharedActionTypes.CREATE_ACCOUNT_FAILED:
    case sharedActionTypes.LOAD_USER_FAILED:
    case sharedActionTypes.LOGIN_IN_PROGRESS:
    case sharedActionTypes.LOGIN_COMPLETE:
    case sharedActionTypes.LOGIN_FAILED:
    case sharedActionTypes.LOGOUT_COMPLETE:
      return Object.assign({}, state, {
        user: action.user,
        loading: action.loading,
        refreshing: action.refreshing,
      });
      break;

    case sharedActionTypes.PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
      });
      break;

    case sharedActionTypes.LOAD_USER_IN_PROGRESS:
      return Object.assign({}, state, {
        loading: action.loading,
        refreshing: action.refreshing,
      });
      break;

    case sharedActionTypes.CREATE_ACCOUNT_COMPLETE:
      return Object.assign({}, state, {
        user: action.user,
        loading: action.loading,
        refreshing: action.refreshing,
        createAccountForm: false,
      });
      break;

    case sharedActionTypes.TOGGLE_AUTH_FORM:
      return Object.assign({}, state, {
        createAccountForm: state.createAccountForm ? !state.createAccountForm : true,
      });
      break;

    default:
      return Object.assign({}, state);
      break;
  }
}

export default authReducer;
