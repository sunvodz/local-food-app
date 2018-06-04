import _ from 'lodash';
import moment from 'moment';

import * as actionTypes from './actionTypes';
import { api } from 'app/shared';

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
        url: '/api/v1/users/orders'
      });

      let orders = response.data;

      let orderedOrders = [];
      for (let i = 0; i < orders.length; i++) {
        let order = orders[i];
        let orderDate = order.order_date_relationship[0];
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

      return dispatch(receiveOrders(orderedOrders.reverse()));
    } catch (error) {

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
