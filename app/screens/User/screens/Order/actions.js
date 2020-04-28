import _ from 'lodash';
import moment from 'moment/min/moment-with-locales';

import * as actionTypes from './actionTypes';
import { api, sharedActions } from 'app/shared';

/**
 * Async action - fetch order.
 *
 * @return {function}
 */
export function fetchOrder(orderDateItemLinkId) {
  return async function(dispatch, getState) {
    try {
      dispatch(requestOrder());

      let response = await api.call({
        url: `/api/v1/user/order/${orderDateItemLinkId}`
      });

      let order = await response.json();

      dispatch(receiveOrder(order));
    } catch (error) {
      sharedActions.checkMaintenanceMode(dispatch, error);
    }
  }
}

export function requestOrder() {
  return {
    type: actionTypes.REQUEST_ORDER,
    order: null,
    loading: true,
  }
}

export function receiveOrder(order) {
  return {
    type: actionTypes.RECEIVE_ORDER,
    order: order,
    loading: false,
  }
}

export function resetOrder() {
  return {
    type: actionTypes.RESET_ORDER,
    order: null,
    loading: false,
  }
}

/**
 * Async action - delete order.
 *
 * @return {function}
 */
export function deleteOrder(orderDateItemLinkId) {
  return async function(dispatch, getState) {
    try {
      dispatch(deleteOrderInProgress());

      let response = await api.call({
        method: 'delete',
        url: `/api/v1/user/order/${orderDateItemLinkId}`
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

      dispatch(deleteOrderComplete(orderedOrders.reverse()));
    } catch(error) {
      sharedActions.checkMaintenanceMode(dispatch, error);
    }
  }
}

export function deleteOrderInProgress() {
  return {
    type: actionTypes.DELETE_ORDER_IN_PROGRESS,
    deleting: true,
  }
}

export function deleteOrderComplete(orderedOrders) {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS,
    deleting: false,
    deleted: true,
    orders: orderedOrders,
  }
}
