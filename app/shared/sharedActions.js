import { AsyncStorage } from 'react-native';
import { API_USERNAME, API_PASSWORD } from 'react-native-dotenv';
import config from '../../config';
import api from './api';
import * as sharedActionTypes from './sharedActionTypes';

import { STRIPE_PUBLISHABLE_KEY } from 'react-native-dotenv';
var stripe = require('stripe-client')(STRIPE_PUBLISHABLE_KEY);

export function serverError() {
  return {
    type: sharedActionTypes.SERVER_ERROR,
  }
}

export function loginUser(username, password) {
  return async function(dispatch, getState) {
    try {
      dispatch(loginInProgress());

      let response = await api.call({
        url: '/api/v1/users/self',
        options: {
          username: username,
          password: password
        }
      });

      let user = response.data;
      user.password = password;
      await AsyncStorage.setItem('@store:user', JSON.stringify(user));

      return dispatch(loginComplete(user));
    } catch (error) {
      dispatch({
        type: sharedActionTypes.SHOW_ERROR,
        title: 'Inloggning misslyckades',
        message: 'Dubbelkolla dina uppgifter',
      });

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
    user: null
  }
}

export function loadUser() {
  return async function(dispatch, getState) {
    try {
      let user = await AsyncStorage.getItem('@store:user');
      user = JSON.parse(user);
      return dispatch(loginComplete(user));
    } catch (error) {
      return dispatch(loginFailed());
    }
  }
}

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
        url: '/api/v1/users/self/membership',
        method: 'post',
        data: {
          stripeToken: token.id,
          amount: data.amount
        }
      });

      if (response.status !== 200) {
        throw response.data;
      }

      dispatch(paymentComplete());
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
  return {
    type: sharedActionTypes.SHOW_ERROR,
    title: 'Betalning kunde inte genomföras',
    message: error,
  }
}

export function paymentComplete() {
  return {
    type: sharedActionTypes.SHOW_SUCCESS,
    title: 'Tack för din betalning',
    message: 'Du är nu medlem i Local Food Nodes och kan handla produkter.',
  };
}