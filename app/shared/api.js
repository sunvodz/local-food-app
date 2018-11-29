import { AsyncStorage } from 'react-native';
import { API_URL, CLIENT_ID, CLIENT_SECRET } from 'app/env.json';
import sdk from 'localfoodnodes-js-sdk';
import _ from 'lodash';

class Api {
  async call(request) {
    try {
      let url = request.url = API_URL + request.url; // Add base url
      if (request.apiUrl) {
        url = request.apiUrl + request.url; // Add base url
      }

      options = await this.extendOptions(request.options);

      let response = await sdk.call(url, options); // request, options

      return response;
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw 'api_error';
      }
    }
  }

  formData(data) {
    return sdk.formatData(data);
  }

  async extendOptions(options) {
    try {
      if (!options) {
        options = {};
      }

      options.baseUrl = API_URL;
      options.auth = {
        username: null,
        password: null,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      };

      let user = await AsyncStorage.getItem('@store:user');
      user = JSON.parse(user);

      if (user) {
        // User already logged in. Used if new token is needed
        options.auth.username = user.email;
        options.auth.password = user.password;
      } else if (_.has(options, 'username') && _.has(options, 'password')) {
        // Login in progress, generate new token
        options.auth.username = options.username;
        options.auth.password = options.password;
        options.renewToken = true;
      }

      return options;
    } catch (error) {
      throw error;
    }
  }
}

export default new Api();
