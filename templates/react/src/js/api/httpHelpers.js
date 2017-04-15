// httpHelpers.js

let checkStatus = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  else if (response['status'] && response['status'] === 408) {
    throw new Error('Communication with the user service has timed out.');
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
};

let fetchTimeout = function(ms, promise) {
  // leverage ES6 Promise object
  return new Promise(function(resolve, reject) {
    let timeout = setTimeout(function() {
      // HTTP 1.1 408 Request Timeout
      reject({status: 408});
      clearTimeout(timeout);
    }, ms);
    return promise.then(resolve, reject);
  });
};

export {checkStatus, fetchTimeout};
