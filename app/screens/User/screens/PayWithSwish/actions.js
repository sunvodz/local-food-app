import { APP_ENV } from 'app/env';
import { SWISH_STARTED, SWISH_SUCCESS, SWISH_FAILED, SWISH_DECLINED } from './actionTypes'
import { Linking, AsyncStorage } from 'react-native'
import api from 'app/shared/api';

export function startSwish(userId, amount) {
  return async function (dispatch, getState) {
    try {
      dispatch(swishStarted());

      let response = await api.call({
        url: '/api/swish/create',
        method: 'post',
        body: {
          user_id: userId,
          amount: amount,
          source: 'app',
        },
        lang: false
      });

      const res = await response.json();

      if (APP_ENV !== 'dev') {
        try {
          const url = `swish://paymentrequest?token=${res.token}&callbackurl=localfoodapp://swishFinished`;
          Linking.openURL(encodeURI(url));
        } catch(error) {
          throw error;
        }
      }

      setTimeout(() => waitForSwishResponse(dispatch, res, 0), 1000);
    } catch (error) {
      let errorMessage = await error.text();
      dispatch(swishFailed(errorMessage));
    }
  }
}

async function waitForSwishResponse(dispatch, res, i) {
  let response = await api.call({
    url: `/api/swish/collect?external_id=${res.external_id}`,
    lang: false
  });

  const paymentTransaction = await response.json();

  if (paymentTransaction.status === 'CREATED') {
    if (i < 300) {
      setTimeout(() => waitForSwishResponse(dispatch, res, i + 1), 3000);
    } else {
      dispatch(swishFailed('timeout'))
    }
  } else if (paymentTransaction.status === 'PAID') {
    // Refresh user
    let response = await api.call({
      url: '/api/v1/user',
    });

    const userData = await response.json();

    let storedUser = await AsyncStorage.getItem('@store:user');
    storedUser = JSON.parse(storedUser);
    let updatedUser = Object.assign({}, storedUser, userData);
    await AsyncStorage.setItem('@store:user', JSON.stringify(updatedUser));
    dispatch(swishSuccess(updatedUser))
  } else if (paymentTransaction.status === 'DECLINED') {
    dispatch(swishDeclined())
  }
}

export function swishStarted() {
  return {
    type: SWISH_STARTED,
  }
}

export function swishSuccess(user) {
  return {
    type: SWISH_SUCCESS,
    user: user,
  }
}
export function swishFailed(errorMessage) {
  return {
    type: SWISH_FAILED,
    title: 'Donation failed',
    message: errorMessage,
  }
}

export function swishDeclined() {
  return {
    type: SWISH_DECLINED,
    title: 'payment_failiure_header',
    message: 'payment_failiure',
  }
}