import * as actionTypes from './actionTypes';
import { sharedActionTypes } from 'app/shared';

function cartReducer(state, action) {
  switch (action.type) {
    case actionTypes.REQUEST_CART:
    case actionTypes.RECEIVE_CART:
    case actionTypes.REMOVED_CART_ITEM:
      return Object.assign({}, state, {
        cart: action.cart,
        loading: action.loading,
        loadingCartItems: [],
        refreshing: action.refreshing || false,
      });
      break;

    case actionTypes.REFRESHING_CART:
      return Object.assign({}, state, {
        refreshing: action.refreshing,
      });
      break;

    case actionTypes.REMOVING_CART_ITEM:
      return Object.assign({}, state, {
        loading: action.loading,
      });
      break;

    case actionTypes.UPDATING_CART_ITEM:
      return Object.assign({}, state, {
        loadingCartItems: addCartItemId(state, action.id),
      });
      break;

    case actionTypes.UPDATED_CART_ITEM:
      return Object.assign({}, state, {
        loadingCartItems: removeCartItemId(state, action.id),
        cart: setUpdatedCartItem(state, action)
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

/**
 *
 * @param {*} state
 * @param {*} action
 */
function setUpdatedCartItem(state, action) {
  return state.cart.map(cartItem => {
    return (cartItem.id === action.cartItem.id) ? action.cartItem : cartItem;
  });
}

/**
 *
 * @param {*} state
 * @param {*} id
 */
function addCartItemId(state, id) {
  let loadingCartItems = state.loadingCartItems || [];

  if (loadingCartItems.indexOf(id) === -1) {
    loadingCartItems.push(id);
  }

  return loadingCartItems;
}

/**
 *
 * @param {*} state
 * @param {*} id
 */
function removeCartItemId(state, id) {
  let loadingCartItems = state.loadingCartItems;
  loadingCartItems.splice(loadingCartItems.indexOf(id), 1);

  return loadingCartItems;
}

export default cartReducer;
