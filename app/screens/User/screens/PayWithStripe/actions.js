import { AsyncStorage } from 'react-native';
import { api, sharedActions, trans } from 'app/shared';
import * as actionTypes from './actionTypes'

/**
 * Payment actions
 */
export function startStripe(userId, data) {
  return async function(dispatch, getState) {
    try {
      dispatch(stripeStarted());

      let payload = {
        user_id: userId,
        amount: data.amount,
        currency: data.currency,
        card_number: data.cardNumber,
        exp_month: data.expMonth,
        exp_year: data.expYear,
        cvc: data.cvc,
        source: 'app',
      };

      // Charge
      let chargeResponse = await api.call({
        url: '/api/stripe/charge',
        method: 'post',
        body: payload,
        lang: false
      });

      let charge = await chargeResponse.json();

      // Refresh user
      let userResponse = await api.call({
        url: '/api/v1/user',
      });

      const userData = await userResponse.json();

      let storedUser = await AsyncStorage.getItem('@store:user');
      storedUser = JSON.parse(storedUser);
      let updatedUser = Object.assign({}, storedUser, userData);
      await AsyncStorage.setItem('@store:user', JSON.stringify(updatedUser));

      dispatch(stripeSuccess(updatedUser));
    } catch (error) {
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);

      errorMessage = await error.text();
      dispatch(stripeFailed(errorMessage));
    }
  }
}

export function stripeStarted(user) {
  return {
    type: actionTypes.STRIPE_STARTED,
    paymentInProgress: true,
  }
}

export function stripeFailed(errorMessage) {
  return {
    type: actionTypes.STRIPE_FAILED,
    title: trans('Donation failed'),
    message: errorMessage,
  }
}

export function stripeSuccess(user) {
  return {
    type: actionTypes.STRIPE_SUCCESS,
    paymentInProgress: false,
    user: user,
  };
}

/**
 * Currencies
 */
export function getCurrencies(data) {
  return async function(dispatch, getState) {
    try {
      dispatch(currenciesInProgress());

      let response = await fetch('https://api.localfoodnodes.org/v1.0/currency/rates?enabled=1');
      let currencies = await response.json();

      dispatch(currenciesComplete(currencies.data));
    } catch (error) {
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);

      dispatch(currenciesFailed(error));
    }
  }
}

export function currenciesInProgress() {
  return {
    type: actionTypes.CURRENCIES_IN_PROGRESS,
    loading: true,
    refreshing: false,
  }
}

export function currenciesComplete(currencies) {
  return {
    type: actionTypes.CURRENCIES_SUCCESS,
    loading: false,
    refreshing: false,
    currencies: currencies
  }
}

export function currenciesFailed() {
  return {
    type: actionTypes.CURRENCIES_FAILED,
    loading: false,
    refreshing: false,
    currencies: null,
  }
}