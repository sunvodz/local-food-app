import { AsyncStorage } from 'react-native';
import { api, trans, sharedActions } from 'app/shared';
import * as actionTypes from './actionTypes';

/**
 * Login actions
 */
export function loginUser(data, lang) {
  return async function(dispatch, getState) {
    try {
      dispatch(loginInProgress());

      let response = await api.call({
        url: '/api/v1/user',
        username: data.email,
        password: data.password
      });

      let user = await response.json();
      user.password = data.password;
      await AsyncStorage.setItem('@store:user', JSON.stringify(user));

      dispatch(sharedActions.notificationActions.registerForPushNotificationsAsync(data.email));
      dispatch(loginComplete(user));
    } catch (error) {
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);
      dispatch(loginFailed(lang));
    }
  }
}

/**
 *
 */
export function loginInProgress() {
  return {
    type: actionTypes.LOGIN_IN_PROGRESS,
    loading: true,
    refreshing: false,
  }
}

/**
 *
 * @param {*} user
 */
export function loginComplete(user) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    loading: false,
    refreshing: false,
    user: {...user}
  }
}

/**
 *
 */
export function loginFailed(lang) {
  return {
    type: actionTypes.LOGIN_FAILED,
    loading: false,
    refreshing: false,
    user: null,
    title: trans('Login failed', lang),
    message: trans('You have entered an invalid username or password.', lang),
  }
}