// user.js

import Message from './message';

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
    this.messages = [];
    this.userData.displayName = this.getDisplayName();
  }

  getDisplayName() {
    const firstName = this.userData.firstName ? this.userData.firstName : '';
    const lastName = this.userData.lastName ? this.userData.lastName : '';
    return `${firstName} ${lastName}`;
  }

  getData() {
    return {
      userData: this.userData,
      messages: this.messages
    };
  }

  setMessages(messages) {
    if(messages) {
      return this.messages = Object.keys(messages).map(function(key) {
        const message = new Message(key, messages[key].type, messages[key].message);
        return message.getData();
      });
    }
  }
}
