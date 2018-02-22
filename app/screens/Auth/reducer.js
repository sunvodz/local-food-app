import { sharedActionTypes } from 'app/shared';

function authReducer(state, action) {
  switch (action.type) {
    case sharedActionTypes.SERVER_ERROR:
      return Object.assign({}, state, {
        serverError: true,
      });
      break;

    case sharedActionTypes.LOGIN_IN_PROGRESS:
    case sharedActionTypes.LOGIN_COMPLETE:
    case sharedActionTypes.LOGIN_FAILED:
    case sharedActionTypes.LOGOUT_COMPLETE:
      return Object.assign({}, state, {
        user: action.user,
        token: action.token,
        loading: action.loading,
      });
      break;

    default:
      return Object.assign({}, state);
      break;
  }
}

export default authReducer;
