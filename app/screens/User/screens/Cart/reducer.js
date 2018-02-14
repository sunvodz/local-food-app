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
      return Object.assign({}, state, {
        loading: action.loading,
      });
      break;

    case actionTypes.UPDATING_CART_ITEM:
      return Object.assign({}, state, {
        updatingCartItems: addCartItemId(state, action.id),
      });
      break;

    case actionTypes.UPDATED_CART_ITEM:
      return Object.assign({}, state, {
        updatingCartItems: removeCartItemId(state, action.id),
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
  let updatingCartItems = state.updatingCartItems || [];

  if (updatingCartItems.indexOf(id) === -1) {
    updatingCartItems.push(id);
  }

  return updatingCartItems;
}

/**
 *
 * @param {*} state
 * @param {*} id
 */
function removeCartItemId(state, id) {
  let updatingCartItems = state.updatingCartItems;
  updatingCartItems.splice(updatingCartItems.indexOf(id), 1);

  return updatingCartItems;
}

export default cartReducer;
