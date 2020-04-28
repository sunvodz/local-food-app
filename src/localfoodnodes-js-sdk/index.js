class LocalFoodNodesSDK {
  /**
   * Constructor.
   */
  constructor() {
    this.token = null;
  }

  /**
   * Make API call.
   *
   * @param  {object} payload
   * @return {promise}
   */
  async call(url, options) {
    options.timeout = 30000;
    options.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (!this.token || options.renewToken) {
      this.token = await this.getToken(options);
    }

    if (this.token) {
      options.headers = Object.assign({}, options.headers, {
        'Authorization': 'Bearer ' + this.token.access_token
      });
    }

    if (options.body) {
      try {
        JSON.parse(options.body); // Nothing happens if body is already json
      } catch (e) {
        options.body = JSON.stringify(options.body); // Convert to json
      }
    }

    try {
      let response = await fetch(url, options);

      if (!response.ok) {
        throw response;
      }

      return response;
    } catch (error) {
      throw error;
    }
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
        client_id: options.auth.client_id,
        client_secret: options.auth.client_secret,
        username: options.auth.username,
        password: options.auth.password,
        scope: '*',
      };

      let formData = this.formData(data);

      let response = await fetch(options.baseUrl + '/oauth/token', {
        method: 'post',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      });

      if (!response.ok) {
        throw response;
      }

      let jsonResponse = await response.json();

      return jsonResponse;
    } catch (error) {
      throw error;
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
