// api.js

import 'whatwg-fetch';

import User from './user';
import { checkStatus, fetchTimeout } from './httpHelpers'; 
import config from '../appConfig';

/**
 * Async function to retrieve a user from a user service.
 */
var getUser = function() {
  const url = `${config.userServiceEndpoint}/user/me?autoRegister=true`;

  /**
   * Use the new 'fetch()' function instead of the old XHR method. It's important
   * to set the credentials mode to 'include' to ensure that Firefox will use a
   * client certificate (if appropriate) when making secure, cross-origin requests.
   * Without this, Firefox confusingly reports CORS errors.
   *
   * Also note that with the chained calls on returned Promise objects we are 
   * deliberately NOT calling .catch()--this would prevent the getUser() caller
   * from being able to catch() errors.
   * 
   * @type {Promise}
   */
  return fetchTimeout(`${config.requestTimeout}`, fetch(url, { credentials: 'include' }))
    // When promise returned by fetchTimeout() is resolved (i.e., request 
    // finishes) the response will be passed to checkStatus().
    .then(checkStatus)
    // Response returned by checkStatus() wil be passed to this arrow function.
    .then(response => response.json())
    // response.json() returns a promise that will resolve once the JSON is parsed
    // (see https://developer.mozilla.org/en-US/docs/Web/API/Body/json). This json
    // will then be passed to the following arrow function. 
    .then(json => {
      let results = {
        user: {},
        rawJsonResp: json
      };

      if (json.item['user']) {
        const user = new User(json.item.user);

        if (json.item['messages']) {
          user.setMessages(json.item.messages);
        }

        results.user = user.getData();
      }
      
      return Promise.resolve(results);
    });
  
};

export { getUser };
