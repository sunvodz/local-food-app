import { AsyncStorage } from 'react-native';
import { Permissions, Notifications, Location } from 'expo';
import _ from 'lodash';
import config from '../../config';
import api from './api';
import * as sharedActionTypes from './sharedActionTypes';

import { STRIPE_PUBLISHABLE_KEY } from 'react-native-dotenv';
var stripe = require('stripe-client')(STRIPE_PUBLISHABLE_KEY);

const PUSH_ENDPOINT = '/api/v1/users/push-token';

export function toggleAuthForm() {
  return {
    type: sharedActionTypes.TOGGLE_AUTH_FORM,
  }
}

/**
 * Create account actions
 */
export function createAccount(data) {
  return async function(dispatch, getState) {
    try {
      dispatch(createAccountInProgress());

      let response = await api.call({
        url: '/api/v1/users',
        method: 'post',
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }
      });

      return dispatch(createAccountComplete());
    } catch (error) {
      return dispatch(createAccountFailed());
    }
  }
}

export function createAccountInProgress() {
  return {
    type: sharedActionTypes.CREATE_ACCOUNT_IN_PROGRESS,
    loading: true,
  }
}

export function createAccountComplete(user) {
  return {
    type: sharedActionTypes.CREATE_ACCOUNT_COMPLETE,
    loading: false,
  }
}

export function createAccountFailed() {
  return {
    type: sharedActionTypes.CREATE_ACCOUNT_FAILED,
    loading: false,
    user: null,

    title: 'Create account',
    message: 'Could not create account',
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
        url: '/api/v1/users/self',
        options: {
          username: data.email,
          password: data.password
        }
      });

      let user = response.data;
      user.password = data.password;
      await AsyncStorage.setItem('@store:user', JSON.stringify(user));

      registerForPushNotificationsAsync(data.email);

      return dispatch(loginComplete(user));
    } catch (error) {
      return dispatch(loginFailed());
    }
  }
}

export function loginInProgress() {
  return {
    type: sharedActionTypes.LOGIN_IN_PROGRESS,
    loading: true,
  }
}

export function loginComplete(user) {
  return {
    type: sharedActionTypes.LOGIN_COMPLETE,
    loading: false,
    user: user
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
      dispatch(logoutFailed());
    }
  }
}

export function logoutComplete() {
  return {
    type: sharedActionTypes.LOGOUT_COMPLETE,
    loading: false,
    user: null
  }
}

export function loginFailed() {
  return {
    type: sharedActionTypes.LOGIN_FAILED,
    loading: false,
    user: null,

    title: 'Login',
    message: 'Authentication failed',
  }
}

/**
 * Load user from storage
 */
export function loadUser() {
  return async function(dispatch, getState) {
    try {
      dispatch(loadUserInProgress());

      // Check if user object is in storage
      let user = await AsyncStorage.getItem('@store:user');
      if (user) {
        user = JSON.parse(user);

        // Authenticate against the API
        let response = await api.call({
          url: '/api/v1/users/self',
          options: {
            username: user.email,
            password: user.password
          }
        });

        return dispatch(loginComplete(user));
      } else {
        throw 'err in loadUser';
      }
    } catch (error) {
      dispatch(loadUserFailed());
      return dispatch(logout());
    }
  }
}

export function loadUserInProgress() {
  return {
    type: sharedActionTypes.LOAD_USER_IN_PROGRESS,
    loading: true,
  }
}

export function loadUserFailed() {
  return {
    type: sharedActionTypes.LOAD_USER_FAILED,
    loading: false,
    user: null
  }
}

/**
 * Payment actions
 */
export function processPayment(data) {
  return async function(dispatch, getState) {
    try {
      dispatch(paymentInProgress());

      let token = await stripe.createToken({
        card: {
          number: data.cardNumber,
          exp_month: data.expMonth,
          exp_year: data.expYear,
          cvc: data.cvc,
        }
      });

      if (token.error) {
        throw token.error.code;
      }

      let response = await api.call({
        url: '/api/v1/users/membership',
        method: 'post',
        data: {
          stripeToken: token.id,
          amount: data.amount
        }
      });

      if (response.status !== 200) {
        throw response.data;
      }

      dispatch(paymentSuccess());
      // Todo: dispatch reload user to get new user data (or returned from succesful payment?)
    } catch (error) {
      dispatch(paymentFailed(error));
    }
  }
}

export function paymentInProgress(user) {
  return {
    type: sharedActionTypes.PAYMENT_IN_PROGRESS,
    paymentInProgress: true,
  }
}

export function paymentFailed(error) {
  // Available error codes: invalid_number, invalid_cvc, invalid_amount
  return {
    type: sharedActionTypes.PAYMENT_FAILED,
    title: 'Membership',
    message: error,
  }
}

export function paymentSuccess() {
  return {
    type: sharedActionTypes.PAYMENT_SUCCESS,
    title: 'Membership',
    message: 'Thank you for your payment, you are now a Local Food Nodes member.',
  };
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
    data: {
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
    throw new Error('Location permission not granted');
  }
}