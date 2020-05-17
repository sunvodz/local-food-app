import _ from 'lodash';
import moment from 'moment/min/moment-with-locales';

import * as actionTypes from './actionTypes';
import { api, sharedActions } from 'app/shared';

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

      let groupedOrders = _.groupBy(orders, (order) => {
        return moment(order.date.date.date).format('YYYYMMDD');
      });

      dispatch(deleteOrderComplete(groupedOrders));
    } catch(error) {
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);
    }
  }
}

export function deleteOrderInProgress() {
  return {
    type: actionTypes.DELETE_ORDER_IN_PROGRESS,
    deleting: true,
  }
}

export function deleteOrderComplete() {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS,
    deleting: false,
    deleted: true,
  }
}
