import { AsyncStorage } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import * as actionTypes from './actionTypes';
import { getAccessToken, alert } from '../../shared/actions';

/**
 * Async action - fetch user from async storage
 *
 * @return {object} user
 */
export function fetchUser() {
  return async function(dispatch, getState) {
    let user = await AsyncStorage.getItem('@Store:user');
    user = await JSON.parse(user);

    return dispatch(userFetched(user));
  }
}

/**
 * Action - user fetched from AsyncStorage.
 *
 * @param  {object} user
 * @return {object}
 */
export function userFetched(user) {
  return {
    type: actionTypes.USER_FETCHED,
    user: user,
  }
}

/**
 * Async action - authenticate user.
 *
 * @param {string} email
 * @param {string} password
 * @return {function}
 */
export function authUser(email, password) {
  return async function(dispatch, getState) {
    let accessToken = null;
    let tokenResponse = await getAccessToken(email, password);

    // Validate token
    if (tokenResponse.status === 200) {
      let data = await tokenResponse.json();
      accessToken = data.access_token;
    } else if (tokenResponse.status === 502) {
      return dispatch(apiOffline());
    }

    // Auth user and get user object
    let userResponse = await fetch(API_URL + '/api/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    });

    // Validate user auth
    if (userResponse.status === 200) {
      let user = await userResponse.json();
      await AsyncStorage.setItem('@Store:user', JSON.stringify(user));
      return dispatch(userAuthSuccess(user));
    } else {
      return dispatch(userAuthFailed());
    }
  }
}

/**
 * Action - user auth in progress.
 *
 * @return {object}
 */
export function userAuthInProgress() {
  return {
    type: actionTypes.AUTH_IN_PROGRESS,
    loading: true,
  }
}

/**
 * Action - user auth successful.
 *
 * @param {object} user
 * @return {object}
 */
export function userAuthSuccess(user) {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
    loading: false,
  }
}

/**
 * Action - user auth failed.
 *
 * @param  {string} user
 * @return {string}
 */
export function userAuthFailed() {
  const message = {
    type: 'error',
    label: 'Login failed',
    message: 'Incorrect email or password. Please try again.',
  };

  return alert(message);
}

/**
 * Action - user auth failed.
 *
 * @param  {string} user
 * @return {string}
 */
export function apiOffline() {
  const message = {
    type: 'error',
    label: 'Offline',
    message: 'Could not connect to the API, please check your connection.',
  };

  return alert(message);
}

/**
 * Async action - logout user.
 *
 * @return {function} [description]
 */
export function logoutUser() {
  return async function(dispatch, getState) {
    await AsyncStorage.removeItem('@Store:user');
    return dispatch(userLoggedOut());
  }
}

/**
 * Action - user logged out.
 * @return {object}
 */
export function userLoggedOut() {
  return {
    type: actionTypes.USER_LOGGED_OUT,
    user: null,
  }
}
