// message.js

/**
 * Uesd to model generic messages that may be displayed, for eample, in
 * a drop-down menu shown as part of the application nav bar. Using a standard
 * model for messages (vs ad hoc JavaScript objects) helps ensure that 
 * the objects always have a guaranteed set of properties.
 */
export default class Message {

  /**
   * @param  {string} something that helps identify the message (e.g., a short-hand code or key)
   * @param  {string} something that helps categorize the message (e.g., warning vs info)
   * @param  {string} user-friendly message
   * @param  {object} any other data
   * @return {Message}
   */
  constructor(id, type, message, data = {}) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.data = data;
  }

  getData() {
    return {
      id: this.id,
      type: this.type,
      message: this.message,
      data: this.data
    };
  }
}
