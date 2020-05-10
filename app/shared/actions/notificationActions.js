import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import * as Device from 'expo-device';
import * as sharedActionTypes from './../sharedActionTypes';
import * as systemActions from './systemActions';
import * as userActions from './userActions';
import trans from './../trans';
import api from './../api';

/**
 * Set notification permission
 * @param {*} userEmail
 */
export function registerForPushNotificationsAsync(userEmail) {
  return async function(dispatch, getState) {
    try {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        dispatch(couldNotRegisterForPushNotifications());
      } else {
        let token = await Notifications.getExpoPushTokenAsync();

        let response = await api.call({
          url: '/api/v1/user/push-token',
          method: 'post',
          body: {
            device_name: Device.deviceName,
            email: userEmail,
            token: token,
          }
        });

        let user = await response.json();

        dispatch(registerPushNotificationSuccess());
        dispatch(userActions.refreshUser(user));
      }
    } catch (error) {
      dispatch(couldNotRegisterForPushNotifications());
    }
  }
}

export function unregisterForPushNotificationsAsync(pushTokenId) {
  return async function(dispatch, getState) {
    try {
      let response = await api.call({
        url: `/api/v1/user/push-token/${pushTokenId}`,
        method: 'delete',
      });

      let user = await response.json();
      dispatch(unregisterPushNotificationSuccess());
      dispatch(userActions.refreshUser(user));
    } catch (error) {
      systemActions.checkMaintenanceMode(dispatch, error);
    }
  }
}

export function couldNotRegisterForPushNotifications() {
  return {
    type: sharedActionTypes.FAILED_REGISTER_PUSH_NOTIFICATIONS,
    title: trans('Push notifications'),
    message: trans('Could not enable push notifications. Check the settings for your phone or for this app.'),
  }
}

export function registerPushNotificationSuccess() {
  return {
    type: sharedActionTypes.REGISTER_PUSH_NOTIFICATIONS_SUCCESS,
    title: trans('Push notifications'),
    message: trans('Push notifications are enabled.'),
  }
}

export function unregisterPushNotificationSuccess() {
  return {
    type: sharedActionTypes.UNREGISTER_PUSH_NOTIFICATIONS_SUCCESS,
    title: trans('Push notifications'),
    message: trans('Push notifications are disabled.'),
  }
}