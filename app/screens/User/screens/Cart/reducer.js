import * as actionTypes from './actionTypes';
import { sharedActionTypes } from 'app/shared';
import _ from 'lodash';

function cartReducer(state, action) {
  switch (action.type) {
    case sharedActionTypes.SERVER_ERROR:
      return Object.assign({}, state, {
        serverError: true,
      });
      break;

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
        updatingCartItems: startUpdatingCartItem(state, action.id),
      });
      break;

    case actionTypes.UPDATED_CART_ITEM:
      return Object.assign({}, state, {
        updatingCartItems: stopUpdatingCartItem(state, action.cartItem),
        cart: updateCartItem(state, action.cartItem)
      });
      break;

    case actionTypes.UPDATED_CART_ITEMS:
      return Object.assign({}, state, {
        updatingCartItems: stopUpdatingCartItems(state, action.cartItems),
        cart: updateCartItems(state, action.cartItems)
      });
      break;

    case actionTypes.ORDER_DONE:
      return Object.assign({}, state);
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

/**
 * Update a single cart item.
 *
 * @param {object} state
 * @param {object} updatedCartItem
 */
function updateCartItem(state, updatedCartItem) {
  return state.cart.map(cartItem => {
    return (cartItem.id === updatedCartItem.id) ? updatedCartItem : cartItem;
  });
}

/**
 * Update multiple cart items.
 *
 * @param {object} state
 * @param {array} updatedCartItems
 */
function updateCartItems(state, updatedCartItems) {
  return _.map(state.cart, cartItem => {
    let index = _.findIndex(updatedCartItems, (updatedCartItem) => {
      return cartItem.id === updatedCartItem.id;
    });

    return (index !== -1) ? updatedCartItems[index] : cartItem;
  });
}

/**
 * Add cart item to updatingCartItem, an array that tracks cart items that are updating/loading.
 *
 * @param {object} state
 * @param {int} id
 */
function startUpdatingCartItem(state, id) {
  let updatingCartItems = state.updatingCartItems || [];

  if (updatingCartItems.indexOf(id) === -1) {
    updatingCartItems.push(id);
  }

  return updatingCartItems;
}

/**
 * Remove a single id from updatingCartItems array
 *
 * @param {object} state
 * @param {int} id
 */
function stopUpdatingCartItem(state, cartItem) {
  let updatingCartItems = state.updatingCartItems;
  updatingCartItems.splice(updatingCartItems.indexOf(cartItem.id), 1);

  return updatingCartItems;
}

/**
 * Remove multiple ids from updatingCartItems array
 *
 * @param {object} state
 * @param {array} ids
 */
function stopUpdatingCartItems(state, cartItems) {
  let cartItemsIds = _.map(cartItems, 'id');

  return _.filter(state.updatingCartItems, (cartItem) => {
    return cartItemsIds.indexOf(cartItem.id) !== -1;
  });
}

export default cartReducer;
