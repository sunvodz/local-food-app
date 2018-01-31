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

      let res = response.data;

      if (res.error) {
        dispatch({
          type: actionTypes.SHOW_ERROR,
          title: 'Fel i kundvagn',
          message: res.error
        });
      } else {
        dispatch({
          type: actionTypes.SHOW_SUCCESS,
          title: 'Kundvagn',
          message: 'Added to cart!'
        });
      }

    } catch (error) {
      console.error(error);
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
        nodeId,
        variantId,
      };

      if (params) {
        url = url + '?' + _.map(params, (value, type) => {
          return `${type}=${value}`;
        }).join('&');
      }

      let response = await api.call({
        url: url
      });

      let res = response.data;

      if (res.error) {
        dispatch({
          type: actionTypes.SHOW_ERROR,
          title: 'Problems requesting dates',
          message: 'Server returned an error',
        });
      }

      dispatch(receiveDates(res));
    } catch (error) {
      dispatch({
        type: actionTypes.SHOW_ERROR,
        title: 'Problem connecting to server',
        message: 'Requesting dates failed'
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
