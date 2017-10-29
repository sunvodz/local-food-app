import { API_URL, API_CLIENT_ID, API_SECRET } from 'react-native-dotenv';
import * as sharedActionTypes from './actionTypes';

/**
 * Retreives access token for user from API.
 *
 * @param {string} email
 * @param {string} password
 * @return {string}
 */
export async function getAccessToken(email, password) {
  try {
    let params = {
      grant_type: 'password',
      client_id: API_CLIENT_ID,
      client_secret: API_SECRET,
      username: email,
      password: password
    };

    let formData = Object.keys(params).map(function(p) {
        return encodeURIComponent(p) + '=' + encodeURIComponent(params[p]);
    }).join('&');

    let response = await fetch(API_URL + '/oauth/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    });

    return response;
  } catch(error) {
    console.error(error);
  }
}

export function alert(alert) {
  return {
    type: sharedActionTypes.ALERT,
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
