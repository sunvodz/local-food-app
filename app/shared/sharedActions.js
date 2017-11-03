import { AsyncStorage } from 'react-native';
import { API_CLIENT_ID, API_SECRET, API_USERNAME, API_PASSWORD } from 'react-native-dotenv';
import config from '../../config';
import * as api from './api';
import * as sharedActionTypes from './sharedActionTypes';

/**
 * Retreives access token for user from API.
 *
 * @param {string} email
 * @param {string} password
 * @return {string}
 */
async function auth(username, password) {
  let data = {
    grant_type: 'password',
    client_id: API_CLIENT_ID,
    client_secret: API_SECRET,
    username: username,
    password: password,
    scope: config.scopes.join(' ')
  }

  let formData = api.formData(data);

  try {
    let response = await api.call({
      url: '/oauth/token',
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    return response.data;
  } catch(error) {
    console.error(error);
  }
}

/**
 * Retreives access token for user from API.
 *
 * @param {string} email
 * @param {string} password
 * @return {string}
 */
export async function refreshToken(token) {
  try {
    let data = {
      grant_type: 'refresh_token',
      client_id: API_CLIENT_ID,
      client_secret: API_SECRET,
      refresh_token: token.refresh_token
    };

    let formData = api.formData(data);

    let response = await api.call({
      url: '/oauth/token',
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    return response.data;
  } catch(error) {
    console.error(error);
  }
}

export function loginUser(username, password) {
  username = API_USERNAME;
  password = API_PASSWORD;

  return async function(dispatch, getState) {
    dispatch(loginInProgress());

    let token = await auth(username, password);

    try {
      let response = await api.call({
        url: '/api/v1/users'
      }, {
        token: token
      });

      let user = response.data;

      await AsyncStorage.setItem('@Store:user', JSON.stringify(user));
      return dispatch(loggedIn(user, token));
    } catch(error) {
      console.error(error);
    }
  }
}

export function loginInProgress() {
  return {
    type: sharedActionTypes.LOGIN_IN_PROGRESS,
    loading: true,
  }
}

export function loggedIn(user, token) {
  return {
    type: sharedActionTypes.LOGGED_IN,
    loading: false,
    user: user,
    token: token,
  }
}

export function logoutUser() {
  return {
    type: sharedActionTypes.LOGGED_OUT,
    loading: false,
    user: null,
    token: null,
  }
}

export function saveToken(token) {
  return {
    type: sharedActionTypes.SAVE_TOKEN,
    token: token,
  }
}

export function error(alert) {
  return {
    type: sharedActionTypes.ERROR,
    loading: false,
    alert: {
      type: alert.type,
      label: alert.label,
      message: alert.message,
    }
  }
}

export function resetAlert() {
  return {
    type: sharedActionTypes.RESET_ALERT,
    alert: null,
  }
}
