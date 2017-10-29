import * as actionTypes from './actionTypes';

function authReducer(state, action) {
  switch (action.type) {
    case actionTypes.USER_FETCHED:
    case actionTypes.AUTH_SUCCESS:
    case actionTypes.USER_LOGGED_OUT:
      return Object.assign({}, state, {
        user: action.user
      });
      break;

    default:
      return Object.assign({}, state);
      break;
  }
}

export default authReducer;
