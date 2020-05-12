import * as actionTypes from './actionTypes';
import * as orderActionTypes from '../Order/actionTypes';

function ordersReducer(state, action) {
  switch (action.type) {
    case actionTypes.REQUEST_ORDERS:
    case actionTypes.RECEIVE_ORDERS:
      return Object.assign({}, state, {
        orders: action.orders,
        loading: action.loading,
      });
      break;

    case orderActionTypes.DELETE_ORDER_SUCCESS:
      return Object.assign({}, state, {
        orders: action.orders,
      });
      break;

    default:
      return Object.assign({}, state);
      break;
  }
}

export default ordersReducer;
