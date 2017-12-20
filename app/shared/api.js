import { API_URL, API_CLIENT_ID, API_SECRET, API_USERNAME, API_PASSWORD } from 'react-native-dotenv';
import sdk from 'localfoodnodes-js-sdk';

class Api {
  async call(request, options) {
    request.url = API_URL + request.url; // Set base url

    options = this.extendOptions(options);

    return await sdk.call(request, options);
  }

  formData(data) {
    return sdk.formatData(data);
  }

  extendOptions(options) {
    if (!options) {
      options = {};
    }

    options.baseUrl = API_URL;

    // Check if user is logged in and add user credentials

    options.auth = {
      clientId: API_CLIENT_ID,
      secret: API_SECRET,
      username: API_USERNAME,
      password: API_PASSWORD,
    };

    return options;
  }
}

export default new Api();
