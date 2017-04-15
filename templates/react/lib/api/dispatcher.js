// dispatcher.js

/**
 * Lightweight, cross-browser functions for centrally publishing and receiving events.
 * Uses browser's built-in DOM element mechanisms under the hood for handling events.
 * @type {Object}
 */
var dispatcher = {

  /**
   * Listen for events.
   * 
   * @param  {string} the name of the event.
   * @param  {function} a callback function; will receive an event param with a .data property.
   * @param  {object} object to which 'this' should refer when the callback function is executed.
   * @return {undefined}
   */
  subscribe(eventName, callbackFcn, callbackScope) {
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    document.getElementById('app').addEventListener(eventName, callbackFcn.bind(callbackScope), false);
  },

  /**
   * Broadcast an event to listeners.
   * 
   * @param  {string} the name of the event.
   * @param  {object} custom data to include in the event; will be set as a .data property.
   * @return {undefined}
   */
  publish(eventName, data) {
    // Create custom event in a way that still works on IE. For more info see 
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/initEvent.
    let event = document.createEvent('Event');
    event.initEvent(eventName, /* bubbles */ true, /* cancelable */ true);

    // Attach the custom event data.
    event.data = data;

    // Use our main app DOM element to dispatch the event. For more info see
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent.
    document.getElementById('app').dispatchEvent(event);
  }
};

export default dispatcher;