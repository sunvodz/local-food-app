import { AsyncStorage } from 'react-native';
import api from './../api';
import trans from './../trans';
import * as sharedActionTypes from './../sharedActionTypes';
import * as systemActions from './systemActions';
import { API_URL } from 'app/env';

/**
 *
 */
export function toggleAuthForm() {
  return {
    type: sharedActionTypes.TOGGLE_AUTH_FORM,
  }
}

/**
 * Create account actions
 */
export function createAccount(data, lang) {
  return async function(dispatch, getState) {
    try {
      dispatch(createAccountInProgress());

      let formData = api.formData(data);

      let lang = '/en';
      if (data.language) {
        lang = '/' + data.language;
      }

      let response = await fetch(API_URL + lang + '/api/v1/user', {
        method: 'post',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      });

      if (!response.ok) {
        throw response;
      }

      dispatch(createAccountComplete(lang));
    } catch (error) {
      systemActions.checkMaintenanceMode(dispatch, error);

      let errorMessage = await error.text();
      dispatch(createAccountFailed(errorMessage, lang));
    }
  }
}

/**
 *
 */
export function createAccountInProgress() {
  return {
    type: sharedActionTypes.CREATE_ACCOUNT_IN_PROGRESS,
    loading: true,
    refreshing: false,
  }
}

/**
 *
 * @param {*} user
 * @param {*} lang
 */
export function createAccountComplete(user, lang) {
  return {
    type: sharedActionTypes.CREATE_ACCOUNT_SUCCESS,
    loading: false,
    refreshing: false,
    title: trans('Account', lang),
    message: trans('Your account has been created', lang)
  }
}

/**
 *
 * @param {*} errorMessage
 * @param {*} lang
 */
export function createAccountFailed(errorMessage, lang) {
  return {
    type: sharedActionTypes.CREATE_ACCOUNT_FAILED,
    loading: false,
    refreshing: false,
    user: null,
    title: trans('Create account', lang),
    message: errorMessage,
  }
}

/**
 * Login actions
 */
export function loginUser(data) {
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

      dispatch(registerForPushNotificationsAsync(data.email));

      dispatch(loginComplete(user));
    } catch (error) {
      systemActions.checkMaintenanceMode(dispatch, error);
      dispatch(loginFailed());
    }
  }
}

/**
 *
 */
export function loginInProgress() {
  return {
    type: sharedActionTypes.LOGIN_IN_PROGRESS,
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
    type: sharedActionTypes.LOGIN_SUCCESS,
    loading: false,
    refreshing: false,
    user: {...user}
  }
}

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
 *
 */
export function loginFailed() {
  return {
    type: sharedActionTypes.LOGIN_FAILED,
    loading: false,
    refreshing: false,
    user: null,
    title: trans('Login failed'),
    message: trans('You have entered an invalid username or password.'),
  }
}

/**
 * Load user from storage
 */
export function loadUser(refreshing) {
  return async function(dispatch, getState) {
    try {
      dispatch(loadUserInProgress(refreshing));

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

        dispatch(loginComplete(user));
      } else {
        dispatch(loadUserFailed('No user in @store:user.'));
      }
    } catch (error) {
      systemActions.checkMaintenanceMode(dispatch, error);

      let errorMessage = null;
      if (typeof error === 'object') {
        errorMessage = await error.text();
      } else {
        errorMessage = error;
      }

      dispatch(loadUserFailed(errorMessage));
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
 * @param {*} errorMessage
 */
export function loadUserFailed(errorMessage) {
  return {
    type: sharedActionTypes.LOAD_USER_FAILED,
    loading: false,
    refreshing: false,
    title: trans('User'),
    message: errorMessage
  }
}

/**
 * Resend email actions
 */
export function resendEmail() {
  return async function(dispatch, getState) {
    try {
      let response = await api.call({
        url: '/api/v1/user/resend-activation-link',
        method: 'post',
      });

      dispatch(resendEmailSuccess());
    } catch (error) {
      systemActions.checkMaintenanceMode(dispatch, error);

      dispatch(resendEmailFailed(error));
    }
  }
}

/**
 *
 * @param {*} error
 */
export function resendEmailFailed(error) {
  return {
    type: sharedActionTypes.RESEND_EMAIL_FAILED,
    title: trans('Verify email'),
    message: trans('Could not send verification email.'),
  }
}

/**
 *
 */
export function resendEmailSuccess() {
  return {
    type: sharedActionTypes.RESEND_EMAIL_SUCCESS,
    title: trans('Verify email'),
    message: trans('We have sent a new verification email to you.'),
  };
}
