import * as actionTypes from './actionTypes'
import { API_URL, API_CLIENT_ID, API_SECRET, API_USERNAME, API_PASSWORD } from 'react-native-dotenv'

export function authUser(email, password) {
  email = API_USERNAME;
  password = API_PASSWORD;

  return async function(dispatch, getState) {
    let token = await getToken(email, password);

    try {
      let response = await fetch(API_URL + '/api/users/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      });

      let responseJson = await response;

      return responseJson.movies;
    } catch(error) {
      console.error(error);
    }
  }
}

export function loginSuccess(data) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data: data,
  }
}

export function loginFail(data) {
  return {
    type: actionTypes.LOGIN_FAIL,
    data: data,
  }
}

async function getToken(email, password) {
  console.log('getTOken');
  try {
    let formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('client_id', API_CLIENT_ID);
    formData.append('client_secret', API_SECRET);
    formData.append('username', email);
    formData.append('password', password);
    formData.append('scope', '');


    let fdata = {
      grant_type: 'password',
      client_id: API_CLIENT_ID,
      client_secret: API_SECRET,
      username: email,
      password: password
    }

    let dataurl = Object.keys(fdata).map(function(k) {
        // return encodeURIComponent(k) + '=' + encodeURIComponent(fdata[k]);

        return k + '=' + fdata[k];
    }).join('&');

    console.log(API_URL + '/oauth/token');
    console.log(dataurl);

    let res = await fetch(API_URL + '/oauth/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: dataurl
    });

    let data = await res;


    console.log(data);

    return data;
  } catch(error) {
    console.error(error);
  }
}
