import * as actionTypes from './actionTypes'
import { api } from 'app/shared';
import _ from 'lodash';

/**
 * Async action - fetch cart.
 *
 * @return {function}
 */
export function fetchCart(refreshing) {
  return async function(dispatch, getState) {
    if (refreshing) {
      dispatch(refreshCart());
    } else {
      dispatch(requestCart());
    }

    let response = await api.call({
      url: '/api/v1/users/cart'
    });

    let cart = await response.json();

    return dispatch(receiveCart(cart));
  }
}

export function refreshCart() {
  return {
    type: actionTypes.REFRESH_CART,
    cart: null,
    refreshing: true,
  }
}

export function requestCart() {
  return {
    type: actionTypes.REQUEST_CART,
    cart: null,
    loading: true,
    refreshing: false,
  }
}

export function receiveCart(cart) {
  return {
    type: actionTypes.RECEIVE_CART,
    cart: cart || {},
    loading: false,
    refreshing: false,
  }
}

/**
 * Async action - remove cart item.
 *
 * @return {function}
 */
export function removeCartItem(cartDateItemLinkId) {
  return async function(dispatch, getState) {
    dispatch(removingCartItem());

    let response = await api.call({
      url: `/api/v1/users/cart/${cartDateItemLinkId}`,
      method: 'delete',
    });

    let updatedCart = await response.json();

    return dispatch(removedCartItem(updatedCart));
  }
}

export function removingCartItem() {
  return {
    type: actionTypes.REMOVING_CART_ITEM,
    loading: true,
  }
}

export function removedCartItem(updatedCart) {
  return {
    type: actionTypes.REMOVED_CART_ITEM,
    cart: updatedCart,
    loading: false,
  }
}

/**
 * Async action - update cart item.
 *
 * @return {function}
 */
export function updateCartItem(id, quantity) {
  return async function(dispatch, getState) {
    try {
      dispatch(updatingCartItem(id));

      let response = await api.call({
        url: '/api/v1/users/cart',
        method: 'put',
        data: {
          cartDateItemLinkId: id,
          quantity: quantity
        }
      });

      let jsonResponse = await response.json();

      if (_.isArray(jsonResponse.data)) {
        dispatch(updatedCartItems(jsonResponse.data));
      } else {
        dispatch(updatedCartItem(jsonResponse.data));
      }
    } catch (error) {
      dispatch(updatingCartFailed(error));
    }
  }
}

export function updatingCartItem(id) {
  return {
    type: actionTypes.UPDATING_CART_ITEM,
    id: id,
  }
}

export function updatedCartItem(cartItem) {
  return {
    type: actionTypes.UPDATED_CART_ITEM,
    cartItem: cartItem,
  }
}

export function updatedCartItems(cartItems) {
  return {
    type: actionTypes.UPDATED_CART_ITEMS,
    cartItems: cartItems
  }
}

export function updatingCartFailed(error) {
  return {
    type: actionTypes.UPDATING_CART_FAILED,
    title: 'cart',
    message: 'error_updating_cart',
  }
}

/**
 * Async action - create order.
 *
 * @return {function}
 */
export function createOrder() {
  return async function(dispatch, getState) {
    try {
      dispatch(createOrderInProgress());

      let response = await api.call({
        method: 'post',
        url: '/api/v1/users/order'
      });

      dispatch(createOrderSuccess());
      dispatch(fetchCart(true));
    } catch (error) {
      return dispatch(createOrderFailed(error));
    }
  }
}

export function createOrderInProgress() {
  return {
    type: actionTypes.CREATE_ORDER_IN_PROGRESS,
    creating: true,
  }
}

export function createOrderSuccess() {
  return {
    type: actionTypes.CREATE_ORDER_SUCCESS,
    creating: false,
    cart: null,
    title: 'order',
    message: 'order_created',
  }
}

export function createOrderFailed(error) {
  return {
    type: actionTypes.CREATE_ORDER_FAILED,
    creating: false,
    title: 'order',
    message: error.message
  }
}