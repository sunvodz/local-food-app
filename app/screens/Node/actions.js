import { AsyncStorage } from 'react-native';
import { api, sharedActions, trans } from 'app/shared';
import * as actionTypes from './actionTypes';
import _ from 'lodash';

export function fetchNode(nodeId) {
  return async function (dispatch, getState) {
    try {
      dispatch(requestNode());

      let response = await api.call({
        url: `/api/v1/nodes/${nodeId}`
      });

      let node = await response.json();

      dispatch(receiveNode(node));
    } catch (error) {
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);

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

export function fetchProductsCount(filters) {
  return async function (dispatch, getState) {
    try {
      let url = '/api/v1/products/count';

      if (filters) {
        url = url + '?' + _.map(filters, (value, type) => {
          return `${type}=${value}`;
        }).join('&');
      }

      let response = await api.call({
        url: url
      });

      let productsCount = await response.json();

      dispatch(receiveProductsCount(productsCount));
    } catch (error) {
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);
    }
  }
}

export function receiveProductsCount(productsCount) {
  return {
    type: actionTypes.RECEIVE_PRODUCTS_COUNT,
    productsCount: productsCount,
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

      let products = await response.json();

      dispatch(receiveProducts(products));
    } catch (error) {
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);

      dispatch(receiveProductsFailed(error));
    }
  }
}

export function requestProducts() {
  return {
    type: actionTypes.REQUEST_PRODUCTS,
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

export function receiveProductsFailed(error) {
  return {
    type: actionTypes.RECEIVE_PRODUCTS_FAILED,
    products: null,
    loadingProducts: false,
    title: trans('Products'),
    message: trans('Failed loading products')
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

      let data = await response.json();
      let dates = Object.values(data).sort();

      dispatch(receiveNodeDates(dates));

      if (dates.length > 0) {
        dispatch(setDateFilter(dates[0]));
      }
    } catch (error) {
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);

      let errorMessage = await error.text();
      dispatch(receiveNodeDatesFailed(errorMessage));
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

export function receiveNodeDatesFailed(errorMessage) {
  return {
    type: actionTypes.RECEIVE_NODE_DATES_FAILED,
    dates: [],
    loadingDates: false,
    title: trans('Node'),
    message: errorMessage,
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
        url: '/api/v1/user/cart',
        body: data
      });

      let jsonResponse = await response.json();

      dispatch(addToCartSuccess());

      dispatch({
        type: actionTypes.RECEIVE_CART,
        cart: jsonResponse,
        loading: false,
        refreshing: false,
      });
    } catch (error) {
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);

      dispatch(addToCartFailed(error));
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
    title: trans('Cart'),
    message: error.error
  }
}

export function addToCartSuccess() {
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    title: trans('Cart'),
    message: trans('Product was added to your cart.')
  }
}

export function toggleFollowNode(nodeId) {
  return async function (dispatch, getState) {
    try {
      let response = await api.call({
        method: 'post',
        url: `/api/v1/user/nodes/${nodeId}`
      });

      let userData = await response.json();

      let storedUser = await AsyncStorage.getItem('@store:user');
      storedUser = JSON.parse(storedUser);
      let updatedUser = Object.assign({}, storedUser, userData);
      await AsyncStorage.setItem('@store:user', JSON.stringify(updatedUser));

      dispatch(followNodeSuccess(updatedUser));
    } catch (error) {
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);

      let errorMessage = await error.text();
      dispatch(followNodeFailed(errorMessage));
    }
  }
}

export function followNodeSuccess(user) {
  return {
    type: actionTypes.FOLLOW_NODE_SUCCESS,
    user: user,
  }
}

export function followNodeFailed(errorMessage) {
  return {
    type: actionTypes.FOLLOW_NODE_FAILED,
    title: trans('Node'),
    message: errorMessage
  }
}