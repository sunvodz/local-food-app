import axios from 'axios';

class LocalFoodNodesSDK {
  /**
   * Constructor.
   */
  constructor() {
    this.token = null;
    this.client = axios.create({
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
  }

  /**
   * Make API call.
   *
   * @param  {object} payload
   * @return {promise}
   */
  async call(request, options) {
    if (!this.token) {
      // Get token
      this.token = await this.getToken(options);
    }

    if (this.token) {
      request.headers = Object.assign({}, request.headers, {
        'Authorization': 'Bearer ' + this.token.access_token
      });
    }

    return this.client(request)
    .catch(function(error) {
      const status = error.response.status;

      if (status >= 500 && status <= 599) {
        console.log('Error in sdk.call');
      }

      return error.response;
    });
  }

  /**
   * Retreives access token for user from API.
   *
   * @param {string} email
   * @param {string} password
   * @return {string}
   */
  async getToken(options) {
    try {
      let data = {
        grant_type: 'password',
        client_id: options.auth.clientId,
        client_secret: options.auth.secret,
        username: options.auth.username,
        password: options.auth.password,
        scope: '*',
      };

      let formData = this.formData(data);

      let response = await this.client({
        url: options.baseUrl + '/oauth/token',
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .catch(function(error) {
        // Refresh token here if needed
        console.error('Error in localfoodnodes-js-sdk.getToken client', error);
      });

      return response.data;
    } catch(error) {
      console.log('Error in sdk.getToken');
      return error.response;
    }
  }

  /**
   * Retreives access token for user from API.
   *
   * @param {string} email
   * @param {string} password
   * @return {string}
   */
  refreshToken(options, token) {
    try {
      let data = {
        grant_type: 'refresh_token',
        client_id: API_CLIENT_ID,
        client_secret: API_CLIENT_SECRET,
        refresh_token: token.refresh_token
      };

      let formData = api.formData(data);

      let response = api.call({
        url: options.baseUrl + '/oauth/token',
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
   * [formData description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  formData(data) {
    return Object.keys(data).map(function(d) {
      return encodeURIComponent(d) + '=' + encodeURIComponent(data[d]);
    }).join('&');
  }
}

export default new LocalFoodNodesSDK();
