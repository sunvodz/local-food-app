import axios from 'axios';
import { API_URL } from 'react-native-dotenv';


let client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

/**
 * Make API call.
 *
 * @param  {object} payload
 * @return {promise}
 */
export function call(request, options) {
  if (options && options.token) {
    request.headers = Object.assign({}, request.headers, {
      'Authorization': 'Bearer ' + options.token.access_token
    });
  }

  return client(request)
  .catch(function(error) {
    console.error('API error', error);
  });
}

export function formData(data) {
  return Object.keys(data).map(function(d) {
    return encodeURIComponent(d) + '=' + encodeURIComponent(data[d]);
  }).join('&');
}
