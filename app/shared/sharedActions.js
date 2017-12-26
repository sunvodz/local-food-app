import { AsyncStorage } from 'react-native';
import { API_CLIENT_ID, API_CLIENT_SECRET, API_USERNAME, API_PASSWORD } from 'react-native-dotenv';
import config from '../../config';
import api from './api';
import * as sharedActionTypes from './sharedActionTypes';

export function loginUser(username, password) {
  username = API_USERNAME;
  password = API_PASSWORD;

  return async function(dispatch, getState) {
    dispatch(loginInProgress());

    try {
      let response = await api.call({
        url: '/api/v1/users/self'
      });

      let user = response.data;

      await AsyncStorage.setItem('@Store:user', JSON.stringify(user));
      return dispatch(loggedIn(user));
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

export function loggedIn(user) {
  return {
    type: sharedActionTypes.LOGGED_IN,
    loading: false,
    user: user
  }
}

export function logoutUser() {
  return {
    type: sharedActionTypes.LOGGED_OUT,
    loading: false,
    user: null
  }
}
