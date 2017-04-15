// user.js

/**
 * User model. Should be used to wrap the user data returned from server.
 * The rest of the JavaScript application should normally use this object
 * instead of interacting directly with user JSON returned by the server;
 * if the server changes its JSON structure for some reason, it would then
 * only affect the code in this class.
 */
export default class User {

  /**
   * @param  {[Object]} JSON object containing user data as returned by server API.
   * @return {[User]}
   */
  constructor(userData) {
    this.userData = userData;
  }

  getDisplayName() {
    return `${this.userData.firstName} ${this.userData.lastName}`;
  }
}