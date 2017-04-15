// application.js

import mainModule from '../mainModule';

mainModule.service('Application', function Application() {

  let ready = false, registeredListeners = {};

  return {
    isReady: function() {
      return ready;
    },

    makeReady: function() {
      ready = true;
      registeredListeners.ready();
    },

    registerListener: function(key, callback) {
      registeredListeners[key] = callback;
    }

  };

});
