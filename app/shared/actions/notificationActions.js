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
export function registerForPushNotificationsAsync(userEmail, lang) {
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

        dispatch(registerPushNotificationSuccess(lang));
        dispatch(userActions.refreshUser(user));
      }
    } catch (error) {
      dispatch(couldNotRegisterForPushNotifications(lang));
    }
  }
}

export function unregisterForPushNotificationsAsync(pushTokenId, lang) {
  return async function(dispatch, getState) {
    try {
      let response = await api.call({
        url: `/api/v1/user/push-token/${pushTokenId}`,
        method: 'delete',
      });

      let user = await response.json();
      dispatch(unregisterPushNotificationSuccess(lang));
      dispatch(userActions.refreshUser(user));
    } catch (error) {
      systemActions.checkMaintenanceMode(dispatch, error);
    }
  }
}

export function couldNotRegisterForPushNotifications(lang) {
  return {
    type: sharedActionTypes.FAILED_REGISTER_PUSH_NOTIFICATIONS,
    title: trans('Push notifications', lang),
    message: trans('Could not enable push notifications. Check the settings for your phone or for this app.', lang),
  }
}

export function registerPushNotificationSuccess(lang) {
  return {
    type: sharedActionTypes.REGISTER_PUSH_NOTIFICATIONS_SUCCESS,
    title: trans('Push notifications', lang),
    message: trans('Push notifications are enabled.', lang),
  }
}

export function unregisterPushNotificationSuccess(lang) {
  return {
    type: sharedActionTypes.UNREGISTER_PUSH_NOTIFICATIONS_SUCCESS,
    title: trans('Push notifications', lang),
    message: trans('Push notifications are disabled.', lang),
  }
}