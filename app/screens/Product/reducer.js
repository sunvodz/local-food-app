import * as actionTypes from './actionTypes';

function productReducer(state, action) {
  switch (action.type) {
    case actionTypes.REQUEST_PRODUCT:
    case actionTypes.RECEIVE_PRODUCT:
      return Object.assign({}, state, {
        product: action.product,
        loading: action.loading,
      });
      break;

    case actionTypes.REQUEST_DATES:
    case actionTypes.RECEIVE_DATES:
      return Object.assign({}, state, {
        dates: action.dates, // Add to product?
        loading: action.loading,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default productReducer;
