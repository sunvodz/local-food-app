import * as actionTypes from './actionTypes';
import { sharedActionTypes } from 'app/shared';

function ordersReducer(state, action) {
  switch (action.type) {
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

export default ordersReducer;
