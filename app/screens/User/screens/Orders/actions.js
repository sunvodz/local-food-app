import _ from 'lodash';
import moment from 'moment/min/moment-with-locales';

import * as actionTypes from './actionTypes';
import { api, sharedActions } from 'app/shared';

/**
 * Async action - fetch orders.
 *
 * @return {function}
 */
export function fetchOrders() {
  return async function(dispatch, getState) {
    try {
      dispatch(requestOrders());

      let response = await api.call({
        url: '/api/v1/user/orders'
      });

      let orders = await response.json();

      let orderedOrders = [];
      for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        let orderDate = order.date;
        let key = moment(orderDate.date.date).format('YYYYMMDD');

        // Check if key exists
        let index = _.findIndex(orderedOrders, function(o) {
          return o.key == key;
        });

        if (index === -1) {
          orderedOrders.push({
            key: key,
            items: [],
          });

          // Set index
          index = orderedOrders.length - 1;
        }

        orderedOrders[index].items.push(order);
      }

      dispatch(receiveOrders(orderedOrders.reverse()));
    } catch (error) {
      sharedActions.checkMaintenanceMode(dispatch, error);

      dispatch(receiveOrdersFailed(error));
    }
  }
}

export function requestOrders() {
  return {
    type: actionTypes.REQUEST_ORDERS,
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

export function receiveOrdersFailed() {
  return {
    type: actionTypes.RECEIVE_ORDERS_FAILED,
    orders: null,
    loading: false,
    title: 'orders',
    message: 'failed_loading_orders',
  }
}
