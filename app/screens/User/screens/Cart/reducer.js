import * as actionTypes from './actionTypes';
import _ from 'lodash';

function cartReducer(state, action) {
  switch (action.type) {
    case actionTypes.REQUEST_CART:
    case actionTypes.RECEIVE_CART:
    case actionTypes.REMOVED_CART_ITEM:
      return Object.assign({}, state, {
        cart: action.cart,
        loading: action.loading,
        updatingCartItems: [],
        refreshing: action.refreshing || false,
      });
      break;

    case actionTypes.REFRESHING_CART:
      return Object.assign({}, state, {
        refreshing: action.refreshing,
      });
      break;

    case actionTypes.REMOVING_CART_ITEM:
    case actionTypes.REMOVE_CART_ITEM_FAILED:
      return Object.assign({}, state, {
        loading: action.loading,
      });
      break;

    case actionTypes.UPDATED_CART_ITEMS:
      return Object.assign({}, state, {
        cart: action.cartItems
      });
      break;

    case actionTypes.ORDER_DONE:
      return Object.assign({}, state);
      break;

    case actionTypes.CREATE_ORDER_IN_PROGRESS:
      return Object.assign({}, state, {
        loading: action.loading,
        creating: action.creating,
      });
      break;

    case actionTypes.CREATE_ORDER_SUCCESS:
      return Object.assign({}, state, {
        cart: action.cart,
        loading: action.loading,
        creating: action.creating,
        created: action.created,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default cartReducer;
