import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';

import * as actionTypes from './actionTypes'
import { api } from 'app/shared';
import { sharedActions } from 'app/shared';


export function fetchLanguages() {
  return async function(dispatch, getState) {
    dispatch(requestLanguages());

    let response = await api.call({
      url: '/api/v1/settings/languages'
    });

    let languages = await response.json();

    return dispatch(receiveLanguages(languages));
  }
}

export function requestLanguages() {
  return {
    type: actionTypes.REQUEST_LANGUAGES,
    languages: null,
    loading: true,
  }
}

export function receiveLanguages(languages) {
  return {
    type: actionTypes.RECEIVE_LANGUAGES,
    languages: languages,
    loading: false,
  }
}

export function setLanguage(lang) {
  return async function(dispatch, getState) {
    // Load
    let user = await AsyncStorage.getItem('@store:user');

    // Set
    user = JSON.parse(user);
    user.language = lang;
    // Store
    await AsyncStorage.setItem('@store:user', JSON.stringify(user));
    await AsyncStorage.setItem('@store:lang', lang);

    return dispatch(sharedActions.loginComplete(user));
  }
}

export function getPushToken() {
  return async function(dispatch, getState) {
    let pushToken = await Notifications.getExpoPushTokenAsync();

    dispatch({
      type: actionTypes.GET_PUSH_TOKEN,
      pushToken: pushToken,
    })
  }
}

// export function setPushToken(pushToken) {
//   return {
//     type: actionTypes.SET_PUSH_TOKEN,
//     languages: languages,
//   }
// }