import { AsyncStorage } from 'react-native';
import { API_URL, API_CLIENT_ID, API_CLIENT_SECRET, API_USERNAME, API_PASSWORD } from 'react-native-dotenv';
import sdk from 'localfoodnodes-js-sdk';
import _ from 'lodash';

class Api {
  async call(request) {
    try {
      request.url = API_URL + request.url; // Add base url
      options = await this.extendOptions(request.options);

      let response = await sdk.call(request, options);

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

      let user = await AsyncStorage.getItem('@store:user');
      user = JSON.parse(user);

      options.auth = {
        clientId: API_CLIENT_ID,
        secret: API_CLIENT_SECRET,
        username: API_USERNAME,
        password: API_PASSWORD,
      };

      if (_.has(options, 'username') && _.has(options, 'password')) {
        // Login in progress, generate new token
        options.auth.username = options.username;
        options.auth.password = options.password;
        options.renewToken = true;
      } else if (user) {
        // User already logged in. Used if new token is needed
        options.auth.username = user.email;
        options.auth.password = user.password;
      }

      return options;
    } catch (error) {
      throw error;
    }
  }
}

export default new Api();
