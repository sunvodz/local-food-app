import { AsyncStorage } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import _ from 'lodash';
import moment from 'moment';

import * as actionTypes from './actionTypes';
import { api, sharedActions } from '../../shared';

/**
 * Async action - fetch orders.
 *
 * @return {function}
 */
export function requestOrders(token) {
  return async function(dispatch, getState) {
    dispatch(fetchingOrders());
    let refreshedToken = await sharedActions.refreshToken(token);
    dispatch(sharedActions.saveToken(refreshedToken));

    let response = await api.call({url: API_URL + '/api/v1/users/orders'}, {
      token: refreshedToken
    });

    let orders = response.data;

    let groupedOrders = _.groupBy(orders, (order) => {
      return moment(order.date.date.date).format('YYYYMMDD');
    });

    return dispatch(receiveOrders(groupedOrders));
  }
}

export function fetchingOrders() {
  return {
    type: actionTypes.FETCHING_ORDERS,
    loading: true,
  }
}

export function receiveOrders(orders) {
  return {
    type: actionTypes.RECEIVE_ORDERS,
    orders: orders,
    loading: false,
  }
}
