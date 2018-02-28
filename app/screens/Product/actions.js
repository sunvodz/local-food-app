import _ from 'lodash';
import { api } from 'app/shared';
import * as actionTypes from './actionTypes';

export function addProductToCart(data) {
  return async function (dispatch, getState) {
    try {
      dispatch(addToCart());

      let response = await api.call({
        method: 'post',
        url: '/api/v1/users/self/cart',
        data: data
      });

      dispatch({
        type: actionTypes.SHOW_SUCCESS,
        title: 'Add to cart',
        message: 'Product was added to your cart'
      });

      dispatch({
        type: actionTypes.RECEIVE_CART,
        cart: response.data,
        loading: false,
        refreshing: false,
      });

    } catch (exception) {
      dispatch({
        type: actionTypes.SHOW_ERROR,
        title: 'Add to cart',
        message: exception.error
      });
    }
  }
}

export function addToCart() {
  return {
    type: actionTypes.ADD_TO_CART,
    loading: true,
  }
}

export function fetchDates(productId, nodeId, variantId) {
  return async function (dispatch, getState) {
    try {
      dispatch(requestDates());

      let url = `/api/v1/products/${productId}/dates`;
      let params = {
        node_id: nodeId,
        variant_id: variantId,
      };

      if (params) {
        url = url + '?' + _.map(params, (value, type) => {
          return `${type}=${value}`;
        }).join('&');
      }

      let response = await api.call({
        url: url
      });

      dispatch(receiveDates(response.data));
    } catch (exception) {
      dispatch({
        type: actionTypes.SHOW_ERROR,
        title: 'Problem loading product',
        message: exception.error
      });
    }
  }
}

export function requestDates() {
  return {
    type: actionTypes.REQUEST_DATES,
    loading: true,
  }
}

export function receiveDates(dates) {
  return {
    type: actionTypes.RECEIVE_DATES,
    dates: dates,
    loading: false,
  }
}
