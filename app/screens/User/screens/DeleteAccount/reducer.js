import * as actionTypes from './actionTypes';

function orderReducer(state, action) {
  switch (action.type) {
    case actionTypes.DELETE_ORDER_IN_PROGRESS:
      return Object.assign({}, state, {
        deleting: action.deleting,
      });
      break;

    case actionTypes.DELETE_ORDER_SUCCESS:
      return Object.assign({}, state, {
        deleting: action.deleting,
        deleted: true,
      });
      break;

    case actionTypes.RESET_DELETE:
      return Object.assign({}, state, {
        deleted: false,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default orderReducer;
