import { AsyncStorage } from 'react-native';
import api from './../api';
import trans from './../trans';
import * as sharedActionTypes from './../sharedActionTypes';
import * as systemActions from './systemActions';

/**
 *
 * @param {*} user
 */
export function refreshUser(user) {
  return {
    type: sharedActionTypes.REFRESH_USER,
    loading: false,
    refreshing: false,
    user: {...user}
  }
}

/**
 * Logout actions
 */
export function logout() {
  return async function(dispatch, getState) {
    try {
      await AsyncStorage.removeItem('@store:user');
      dispatch(logoutComplete());
    } catch (error) {
      systemActions.checkMaintenanceMode(dispatch, error);

      dispatch(logoutFailed());
    }
  }
}

/**
 *
 */
export function logoutComplete() {
  return {
    type: sharedActionTypes.LOGOUT_SUCCESS,
    loading: false,
    user: null
  }
}

/**
 * Load user from storage. This is the first action dispatch when
 * app is mounted.
 */
export function loadUser(refreshing, lang) {
  return async function(dispatch, getState) {
    try {
      dispatch(loadUserInProgress(refreshing));

      let lang = await AsyncStorage.getItem('@store:lang');
      if (lang) {
        dispatch(systemActions.setLanguage(lang));
      }

      // Check if user object is in storage
      let user = await AsyncStorage.getItem('@store:user');

      if (user) {
        user = JSON.parse(user);

        // Authenticate against the API. Fetch user updates
        let response = await api.call({
          url: '/api/v1/user',
          username: user.email,
          password: user.password,
        });

        user = await response.json();
        dispatch(loadUserSuccess(user));
      } else {
        dispatch(loadUserFailed(trans('Could not load user data, please login again.', lang)));
      }
    } catch (error) {
      systemActions.checkMaintenanceMode(dispatch, error);

      let errorMessage = null;
      if (typeof error === 'object') {
        errorMessage = await error.text();
      } else {
        errorMessage = error;
      }

      dispatch(loadUserFailed(errorMessage, lang));
    }
  }
}

/**
 *
 * @param {*} refreshing
 */
export function loadUserInProgress(refreshing) {
  return {
    type: sharedActionTypes.LOAD_USER_IN_PROGRESS,
    loading: !refreshing,
    refreshing: refreshing,
  }
}

/**
 *
 * @param {*} user
 */
export function loadUserSuccess(user) {
  return {
    type: sharedActionTypes.LOAD_USER_SUCCESS,
    loading: false,
    refreshing: false,
    user: {...user}
  }
}

/**
 *
 * @param {*} errorMessage
 */
export function loadUserFailed(errorMessage, lang) {
  return {
    type: sharedActionTypes.LOAD_USER_FAILED,
    loading: false,
    refreshing: false,
    title: trans('User', lang),
    message: errorMessage
  }
}

/**
 * Resend email actions
 */
export function resendEmail(lang) {
  return async function(dispatch, getState) {
    try {
      let response = await api.call({
        url: '/api/v1/user/resend-activation-link',
        method: 'post',
      });

      dispatch(resendEmailSuccess(lang));
    } catch (error) {
      systemActions.checkMaintenanceMode(dispatch, error);

      dispatch(resendEmailFailed(error, lang));
    }
  }
}

/**
 *
 * @param {*} error
 */
export function resendEmailFailed(error, lang) {
  return {
    type: sharedActionTypes.RESEND_EMAIL_FAILED,
    title: trans('Verify email', lang),
    message: trans('Could not send verification email.', lang),
  }
}

/**
 *
 */
export function resendEmailSuccess() {
  return {
    type: sharedActionTypes.RESEND_EMAIL_SUCCESS,
    title: trans('Verify email', lang),
    message: trans('We have sent a new verification email to you.', lang),
  };
}
