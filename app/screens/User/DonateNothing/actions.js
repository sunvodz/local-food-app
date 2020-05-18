import { AsyncStorage } from 'react-native';
import { api, sharedActions, trans } from 'app/shared';
import * as actionTypes from './actionTypes';

/**
 * Donate nothing
 */
export function donateNothing(userId, lang) {
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
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);

      dispatch(donateNothingFailed(error, lang));
    }
  }
}

export function donateNothingStarted() {
  return {
    type: actionTypes.DONATE_NOTHING_STARTED,
    paymentInProgress: true,
    paymentSuccess: false,
  };
}

export function donateNothingSuccess(user) {
  return {
    type: actionTypes.DONATE_NOTHING_SUCCESS,
    paymentInProgress: false,
    paymentSuccess: true,
    user: user,
  };
}

export function donateNothingFailed(error, lang) {
  return {
    type: actionTypes.DONATE_NOTHING_FAILED,
    paymentInProgress: false,
    title: trans('Donation', lang),
    message: error,
  }
}