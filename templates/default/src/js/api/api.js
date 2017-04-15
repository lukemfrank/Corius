// api.js

import config from '../appConfig';
import User from './user.js';
import 'whatwg-fetch';

var getUser = function() {
  let url = `${config.userServiceEndpoint}/user/me?autoRegister=true`;

  // Use the new 'fetch()' function instead of the old XHR method. It's important
  // to set the credentials mode to 'include' to ensure that Firefox will use a
  // client certificate (if appropriate) when making secure, cross-origin requests.
  // Without this, Firefox confusingly reports CORS errors.
  //
  // Also note that with the chained calls on returned Promise objects we are 
  // deliberately NOT calling .catch()--this would prevent the getUser() caller
  // from being able to catch() errors.
  let userPromise = fetch(url, { credentials: 'include' })

    // When promise returned by fetch() is resolved (i.e., request finishes) the
    // response will be passed to the following arrow function.
    .then(response => {

      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      else {
        let error = new Error(response.statusText);
        error.response = response;
        let json = response.json();
        return json.then(errJson => {
          error.json = errJson;
          throw error;
        });
      }
    })

    // response.json() returns a promise that will resolve once the JSON is parsed
    // (see https://developer.mozilla.org/en-US/docs/Web/API/Body/json). This json
    // will then be passed to the following arrow function. 
    .then(json => {
      
      let results = {
        user: null,
        messages: null,
        rawJsonResp: json
      };

      if(json.item.user) {
        results.user = new User(json.item.user);
      }

      if(json.item.messages) {
        results.messages = json.item.messages;
      }
      
      return Promise.resolve(results);
    });

  return userPromise;
};

export {getUser};
