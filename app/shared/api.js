import { AsyncStorage } from 'react-native';
import { API_URL, API_CLIENT_ID, API_CLIENT_SECRET } from 'app/env.json';
import sdk from 'localfoodnodes-js-sdk';
import _ from 'lodash';

class Api {
  async call(request) {
    try {
      let url = API_URL + request.url;
      let options = await this.extendOptions(request);
      let response = await sdk.call(url, options);

      return response;
    } catch (error) {
      throw error;
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
        client_id: API_CLIENT_ID,
        client_secret: API_CLIENT_SECRET,
      };

      let user = await AsyncStorage.getItem('@store:user');
      user = JSON.parse(user);

      if (_.has(options, 'username') && _.has(options, 'password')) {
        // Login new user
        options.auth.username = options.username;
        options.auth.password = options.password;
        options.renewToken = true;
      } else if (user) {
        // Use logged in users credentials
        options.auth.username = user.email;
        options.auth.password = user.password;
      } 
      // console.log(options);
      
      return options;
    } catch (error) {
      throw error;
    }
  }
}

export default new Api();
