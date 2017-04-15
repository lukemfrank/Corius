// eventBus.js

import $ from 'jquery';

let $bus = $({});

export default {
  on: (eventName, callbackFcn) => {
    $bus.on(eventName, callbackFcn);
  },

  broadcast: (eventName, eventData) => {
    // Run callbacks/handlers asynchronously (allowing current call to broadcast() to finish immediately)
    setTimeout(() => {
      // Use jQuery to broadcast the event. Note that we are enclosing eventData in an array. If we 
      // didn't do this and eventData is an array, then jQuery would pass each element of the array as
      // a separate parameter to callback functions. For more info see http://api.jquery.com/trigger/.
      $bus.trigger(eventName, [eventData]);
    }, 100);
  }
};
