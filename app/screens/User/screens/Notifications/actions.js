import { api } from 'app/shared';
import * as actionTypes from './actionTypes';

export function fetchNotifications() {
  return async function (dispatch, getState) {
    try {
      dispatch(requestNotifications());

      let response = await api.call({
        url: '/api/v1/users/notifications'
      });

      let notifications = response.data;

      dispatch(receiveNotifications(notifications));
    } catch (error) {
      dispatch(receiveNotificationsFailed(error));
    }
  }
}

export function requestNotifications() {
  return {
    type: actionTypes.REQUEST_NOTIFICATIONS,
    notifications: [],
    loading: true,
  }
}

export function receiveNotifications(notifications) {
  return {
    type: actionTypes.RECEIVE_NOTIFICATIONS,
    notifications: notifications,
    loading: false,
  }
}

export function receiveNotificationsFailed(error) {
  return {
    type: actionTypes.RECEIVE_NOTIFICATIONS_FAILED,
    notifications: [],
    loading: false,
    title: 'notifications',
    message: 'failed_loading_notifications',
  }
}

export function resetNotifications() {
  return async function (dispatch, getState) {
    try {
      dispatch({type: actionTypes.RESET_NOTIFICATIONS});
      await api.call({url: '/api/v1/users/notifications/reset'});
    } catch (error) {
      dispatch({type: actionTypes.RESET_NOTIFICATIONS_FAILED});
    }
  }
}
