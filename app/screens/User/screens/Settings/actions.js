import { AsyncStorage } from 'react-native';
import * as actionTypes from './actionTypes'
import { api } from 'app/shared';
import { sharedActions } from 'app/shared';


export function fetchLanguages() {
  return async function(dispatch, getState) {
    dispatch(requestLangages());

    let response = await api.call({
      url: '/api/v1/settings/languages'
    });

    let languages = response.data;

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

    return dispatch(sharedActions.loginComplete(user));
  }
}
