import * as actionTypes from './actionTypes';
import { sharedActionTypes } from 'app/shared';

function ordersReducer(state, action) {
  switch (action.type) {
    case actionTypes.REQUEST_ORDERS:
    case actionTypes.RECEIVE_ORDERS:
      return Object.assign({}, state, {
        orders: action.orders,
        loading: action.loading,
        reloadOrders: false,
      });
      break;

    case actionTypes.DELETE_ORDER_SUCCESS:
      return Object.assign({}, state, {
        reloadOrders: true,
      });
      break;

    default:
      return Object.assign({}, state, {
        loading: false,
        reloadOrders: false,
      });
      break;
  }
}

export default ordersReducer;
