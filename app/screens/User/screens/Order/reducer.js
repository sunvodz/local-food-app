import * as actionTypes from './actionTypes';

function orderReducer(state, action) {
  switch (action.type) {
    case actionTypes.REQUEST_ORDER:
    case actionTypes.RECEIVE_ORDER:
    case actionTypes.RESET_ORDER:
      return Object.assign({}, state, {
        loading: action.loading,
        order: action.order,
      });
      break;

    case actionTypes.DELETE_ORDER_IN_PROGRESS:
      return Object.assign({}, state, {
        deleting: action.deleting,
      });
      break;

    case actionTypes.DELETE_ORDER_SUCCESS:
      return Object.assign({}, state, {
        order: null,
        deleting: action.deleting,
        deleted: true,
      });
      break;

    case actionTypes.RESET_DELETE:
      return Object.assign({}, state, {
        loading: false,
        deleted: false,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default orderReducer;
