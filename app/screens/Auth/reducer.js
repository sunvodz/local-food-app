import { sharedActionTypes } from 'app/shared';

function authReducer(state, action) {
  switch (action.type) {
    case sharedActionTypes.LOGIN_IN_PROGRESS:
    case sharedActionTypes.LOGGED_IN:
    case sharedActionTypes.LOGGED_OUT:
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
