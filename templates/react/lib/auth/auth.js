// auth.js

import { fromJS } from 'immutable';

import dispatcher from '../api/dispatcher';
import { getUser } from '../api/api';
import User from '../api/user';

let loggedIn = false;

export default {

  login(callback) {

    const invokeCallback = (userExists, errorMessage = '') => {
      if (callback) callback(userExists, errorMessage);
      this.onChange(userExists, errorMessage);
    };

    if(!sessionStorage.getItem('currentUser')) {
      getUser()
        .then(function(results) {
          dispatcher.publish('currentUserChanged', fromJS({user: results.user}));
          loggedIn = true;
          invokeCallback(loggedIn);
        })
        .catch(error => {
          let errMsg = '';
          if(error.json) {
            error.json.errors.map(err => { errMsg += ` ${err.message}`; });
          }
          loggedIn = false;
          invokeCallback(loggedIn, errMsg);
        });
    } else {
      // attempting to reach out to sessionStorage to fetch for already authenticated user.
      let storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
      let storedUserNotifications = JSON.parse(sessionStorage.getItem('currentUserNotifications'));

      let currentUser = new User(storedUser);
      currentUser.setMessages(storedUserNotifications);

      dispatcher.publish('currentUserChanged', fromJS({user: currentUser.getData()}));
      loggedIn = true;
      invokeCallback(loggedIn);
    }
  },

  logout(callback) {
    if (callback) callback();
    this.onChange(false);
  },

  loggedIn() {
    return loggedIn;
  },

  onChange() {}
};
