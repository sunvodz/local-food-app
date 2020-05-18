import { AsyncStorage } from 'react-native';
import { api, sharedActions, trans } from 'app/shared';
import * as actionTypes from './actionTypes';
import * as cartActions from 'app/screens/User/Cart/actions';
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

export function fetchProducts(filters, lang) {
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

      dispatch(receiveProductsFailed(error, lang));
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

export function receiveProductsFailed(error, lang) {
  return {
    type: actionTypes.RECEIVE_PRODUCTS_FAILED,
    products: null,
    loadingProducts: false,
    title: trans('Products', lang),
    message: trans('Failed loading products', lang)
  }
}

export function receiveProductQuantity(products) {
  return {
    type: actionTypes.RECEIVE_PRODUCT_QUANTITY,
    quantity: quantity,
  }
}

export function fetchNodeDates(nodeId, lang) {
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
      dispatch(receiveNodeDatesFailed(errorMessage, lang));
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

export function receiveNodeDatesFailed(errorMessage, lang) {
  return {
    type: actionTypes.RECEIVE_NODE_DATES_FAILED,
    dates: [],
    loadingDates: false,
    title: trans('Node', lang),
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

export function addProductToCart(data, lang) {
  return async function (dispatch, getState) {
    try {
      dispatch(addToCart());

      let response = await api.call({
        method: 'post',
        url: '/api/v1/user/cart',
        body: data
      });

      let cart = await response.json();

      dispatch(addToCartSuccess(lang));
      dispatch(cartActions.receiveCart(cart));
    } catch (error) {
      let errorMessage = await error.text();
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);

      dispatch(addToCartFailed(errorMessage, lang));
    }
  }
}

export function addToCart() {
  return {
    type: actionTypes.ADD_TO_CART,
    loading: true,
  }
}

export function addToCartFailed(errorMessage, lang) {
  return {
    type: actionTypes.ADD_TO_CART_FAILED,
    title: trans('Shopping cart', lang),
    message: errorMessage
  }
}

export function addToCartSuccess(lang) {
  return {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    title: trans('Shopping cart', lang),
    message: trans('Product was added to your cart.', lang)
  }
}

export function toggleFollowNode(nodeId, lang) {
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
      dispatch(followNodeFailed(errorMessage, lang));
    }
  }
}

export function followNodeSuccess(user) {
  return {
    type: actionTypes.FOLLOW_NODE_SUCCESS,
    user: user,
  }
}

export function followNodeFailed(errorMessage, lang) {
  return {
    type: actionTypes.FOLLOW_NODE_FAILED,
    title: trans('Node', lang),
    message: errorMessage
  }
}