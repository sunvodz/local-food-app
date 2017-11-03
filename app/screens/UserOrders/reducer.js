import * as actionTypes from './actionTypes';
import { sharedActionTypes } from '../../shared';

function userOrdersReducer(state, action) {
  switch (action.type) {
    case sharedActionTypes.ALERT:
    case sharedActionTypes.RESET_ALERT:
      return Object.assign({}, state, {
        alert: action.alert,
      });
      break;

    case actionTypes.REQUEST_ORDERS:
    case actionTypes.FETCHING_ORDERS:
    case actionTypes.RECEIVE_ORDERS:
      return Object.assign({}, state, {
        orders: action.orders,
        loading: action.loading,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default userOrdersReducer;
