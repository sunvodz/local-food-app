import { api } from 'app/shared';
import * as actionTypes from './actionTypes';
import _ from 'lodash';

export function fetchNode(nodeId) {
  return async function (dispatch, getState) {
    try {
      dispatch(requestNode());

      let response = await api.call({
        url: `/api/v1/nodes/${nodeId}`
      });

      let node = response.data;

      dispatch(receiveNode(node));
    } catch (error) {
      dispatch(receiveNodeFailed(error));
    }
  }
}

export function requestNode() {
  return {
    type: actionTypes.REQUEST_NODE,
    node: null,
    loadingNode: true,
  }
}

export function receiveNode(node) {
  return {
    type: actionTypes.RECEIVE_NODE,
    node: node,
    loadingNode: false,
  }
}

export function receiveNodeFailed(error) {
  return {
    type: actionTypes.RECEIVE_NODE_FAILED,
    node: null,
    loadingNode: false,
  }
}

export function fetchProducts(filters) {
  return async function (dispatch, getState) {
    try {
      dispatch(requestProducts());

      let url = '/api/v1/products';

      if (filters) {
        url = url + '?' + _.map(filters, (value, type) => {
          return `${type}=${value}`;
        }).join('&');
      }

      let response = await api.call({
        url: url
      });

      let products = response.data;

      // Shuffle
      for (let i = products.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [products[i], products[j]] = [products[j], products[i]];
      }

      dispatch(receiveProducts(products));
    } catch (error) {
      console.error('Error fetching product', error);
    }
  }
}

export function requestProducts() {
  return {
    type: actionTypes.REQUEST_PRODUCTS,
    products: null,
    loadingProducts: true,
  }
}

export function receiveProducts(products) {
  return {
    type: actionTypes.RECEIVE_PRODUCTS,
    products: products,
    loadingProducts: false,
  }
}

export function fetchProductQuantity() {
  return async function (dispatch, getState) {
    try {
      dispatch(requestProductQuantity());

      let url = `/api/v1/products/${productId}/quantity`;

      let response = await api.call({
        url: url,
        data: data // variantId, nodeId, date
      });

      let quantity = response.data;

      dispatch(receiveProductQuantity(quantity));
    } catch (error) {
      console.error('Error fetching product quantity', error);
    }
  }
}

export function requestProductQuantity() {
  return {
    type: actionTypes.REQUEST_PRODUCT_QUANTITY,
  }
}

export function receiveProductQuantity(products) {
  return {
    type: actionTypes.RECEIVE_PRODUCT_QUANTITY,
    quantity: quantity,
  }
}

export function fetchNodeDates(nodeId) {
  return async function (dispatch, getState) {
    try {
      dispatch(requestNodeDates());

      let response = await api.call({
        url: `/api/v1/nodes/${nodeId}/dates`
      });

      let dates = Object.values(response.data).sort();

      dispatch(receiveNodeDates(dates));

      if (dates.length > 0) {
        dispatch(setDateFilter(dates[0]));
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export function requestNodeDates() {
  return {
    type: actionTypes.REQUEST_NODE_DATES,
    loadingDates: true,
  }
}

export function receiveNodeDates(dates) {
  return {
    type: actionTypes.RECEIVE_NODE_DATES,
    dates: dates,
    loadingDates: false,
  }
}

export function setDateFilter(date) {
  return {
    type: actionTypes.SET_DATE_FILTER,
    date: date || '',
  }
}

export function resetNode() {
  return {
    type: actionTypes.RESET_NODE,
  }
}

export function addProductToCart(data) {
  return async function (dispatch, getState) {
    try {
      dispatch(addToCart());

      let response = await api.call({
        method: 'post',
        url: '/api/v1/users/cart',
        data: data
      });

      dispatch(addToCartSuccess());

      return dispatch({
        type: actionTypes.RECEIVE_CART,
        cart: response.data,
        loading: false,
        refreshing: false,
      });
    } catch (error) {
      return dispatch(addToCartFailed(error));
    }
  }
}

export function addToCart() {
  return {
    type: actionTypes.ADD_TO_CART,
    loading: true,
  }
}

export function addToCartFailed(error) {
  return {
    type: actionTypes.ADD_TO_CART_FAILED,
    title: 'cart',
    message: error.error
  }
}

export function addToCartSuccess() {
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    title: 'cart',
    message: 'product_added_to_cart'
  }
}

export function addNodeToUser(nodeId) {
  return async function (dispatch, getState) {
    try {
      let response = await api.call({
        method: 'post',
        url: `/api/v1/users/nodes/${nodeId}`
      });
    } catch (error) {}
  }
}