import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import api from './api';
import trans from './trans';
import * as sharedActionTypes from './sharedActionTypes';
import { API_URL } from 'app/env';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const PUSH_ENDPOINT = '/api/v1/user/push-token';

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
      checkMaintenanceMode(dispatch, error);

      let errorMessage = await error.text();
      dispatch(createAccountFailed(errorMessage, lang));
    }
  }
}

export function createAccountInProgress() {
  return {
    type: sharedActionTypes.CREATE_ACCOUNT_IN_PROGRESS,
    loading: true,
    refreshing: false,
  }
}

export function createAccountComplete(user, lang) {
  return {
    type: sharedActionTypes.CREATE_ACCOUNT_SUCCESS,
    loading: false,
    refreshing: false,
    title: trans('Account', lang),
    message: trans('Your account has been created', lang)
  }
}

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

      registerForPushNotificationsAsync(data.email);

      dispatch(loginComplete(user));
    } catch (error) {
      checkMaintenanceMode(dispatch, error);
      dispatch(loginFailed());
    }
  }
}

export function loginInProgress() {
  return {
    type: sharedActionTypes.LOGIN_IN_PROGRESS,
    loading: true,
    refreshing: false,
  }
}

export function loginComplete(user) {
  return {
    type: sharedActionTypes.LOGIN_SUCCESS,
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
      checkMaintenanceMode(dispatch, error);

      dispatch(logoutFailed());
    }
  }
}

export function logoutComplete() {
  return {
    type: sharedActionTypes.LOGOUT_SUCCESS,
    loading: false,
    user: null
  }
}

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
      checkMaintenanceMode(dispatch, error);

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

export function loadUserInProgress(refreshing) {
  return {
    type: sharedActionTypes.LOAD_USER_IN_PROGRESS,
    loading: !refreshing,
    refreshing: refreshing,
  }
}

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
 * Set notification permission
 * @param {*} userEmail
 */
async function registerForPushNotificationsAsync(userEmail) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();

  return await api.call({
    url: PUSH_ENDPOINT,
    method: 'post',
    body: {
      token: token,
      email: userEmail,
    }
  });
}

export async function getLocationAsync() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    let location =  await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    return location;
  } else {
    throw new Error(trans('Location permission not granted'));
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
      checkMaintenanceMode(dispatch, error);

      dispatch(resendEmailFailed(error));
    }
  }
}

export function resendEmailFailed(error) {
  return {
    type: sharedActionTypes.RESEND_EMAIL_FAILED,
    title: trans('Verify email'),
    message: trans('Could not send verification email.'),
  }
}

export function resendEmailSuccess() {
  return {
    type: sharedActionTypes.RESEND_EMAIL_SUCCESS,
    title: trans('Verify email'),
    message: trans('We have sent a new verification email to you.'),
  };
}

/**
 * Donate nothing
 */
export function donateNothing(userId) {
  return async function(dispatch, getState) {
    try {
      dispatch(donateNothingStarted());

      await api.call({
        url: '/api/payments/donate-nothing',
        method: 'post',
        body: {
          user_id: userId
        },
        lang: false,
      });

      let response = await api.call({
        url: '/api/v1/user',
      });

      let userData = await response.json();

      let storedUser = await AsyncStorage.getItem('@store:user');
      storedUser = JSON.parse(storedUser);
      let updatedUser = Object.assign({}, storedUser, userData);
      await AsyncStorage.setItem('@store:user', JSON.stringify(updatedUser));

      dispatch(donateNothingSuccess(updatedUser));
    } catch (error) {
      checkMaintenanceMode(dispatch, error);

      dispatch(donateNothingFailed(error));
    }
  }
}

export function donateNothingStarted() {
  return {
    type: sharedActionTypes.DONATE_NOTHING_STARTED,
    paymentInProgress: true,
  };
}

export function donateNothingSuccess(user) {
  return {
    type: sharedActionTypes.DONATE_NOTHING_SUCCESS,
    paymentInProgress: false,
    user: user,
  };
}

export function donateNothingFailed(error) {
  return {
    type: sharedActionTypes.DONATE_NOTHING_FAILED,
    paymentInProgress: false,
    title: trans('Membership'),
    message: error,
  }
}

/**
 *
 * @param {*} error
 * @param {*} dispatch
 */
export function checkMaintenanceMode(dispatch, error) {
  if (error && error.status === 503) {
    dispatch(maintenanceModeEnabled());
  } else {
    dispatch(maintenanceModeDisabled());
  }
}

export function maintenanceModeEnabled() {
  return {
    type: sharedActionTypes.MAINTENANCE_MODE_ENABLED,
  }
}

export function maintenanceModeDisabled() {
  return {
    type: sharedActionTypes.MAINTENANCE_MODE_DISABLED,
  }
}

export function checkIfBackendIsBack() {
  return async function(dispatch, getState) {
    try {
      await api.call({
        url: '/',
      });

      dispatch(maintenanceModeDisabled());
    } catch (error) {
      dispatch(maintenanceModeEnabled());
    }
  }
}