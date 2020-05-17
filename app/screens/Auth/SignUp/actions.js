import { AsyncStorage } from 'react-native';
import { api, trans, sharedActions } from 'app/shared';
import { API_URL } from 'app/env';
import * as actionTypes from './actionTypes';
import * as loginActions from '../Login/actions';

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
      dispatch(loginActions.loginUser(data));
    } catch (error) {
      sharedActions.systemActions.checkMaintenanceMode(dispatch, error);

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
    type: actionTypes.CREATE_ACCOUNT_IN_PROGRESS,
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
    type: actionTypes.CREATE_ACCOUNT_SUCCESS,
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
    type: actionTypes.CREATE_ACCOUNT_FAILED,
    loading: false,
    refreshing: false,
    user: null,
    title: trans('Create account', lang),
    message: errorMessage,
  }
}