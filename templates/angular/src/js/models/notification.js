// notification.js

/**
 * Uesd to model generic notifications that may be displayed, for eample, in
 * a drop-down menu shown as part of the application nav bar. Using a standard
 * model for notifications (vs ad hoc JavaScript objects) helps ensure that 
 * the objects always have a guaranteed set of properties.
 */
export class Notification {

  /**
   * @param  {string} something that helps identify the notification (e.g., a short-hand code or key)
   * @param  {string} something that helps categorize the notification (e.g., warning vs info)
   * @param  {string} user-friendly message
   * @param  {object} any other data
   * @return {Notification}
   */
  constructor(id, type, message, data) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.data = data;
  }
}