// auth.js

import eventBus from '../util/eventBus.js';
import { getUser } from '../api/api';
import Notification from '../api/notification.js';
import User from '../api/user.js';

let currentUser = null;

export default {
  login: () => {
    if (!sessionStorage.getItem('currentUser')) {
      return getUser()
        .then((results) => {
          currentUser = results.user.userData;
          sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

          let notifications = new Array();
          if(results.messages) {
            for(let msgKey in results.messages) {
              notifications.push(new Notification(msgKey, results.messages[msgKey].type, results.messages[msgKey].message, null));
            }
            sessionStorage.setItem('currentUserNotifications', JSON.stringify(notifications));
          }

          eventBus.broadcast('currentUserChanged', currentUser);
          eventBus.broadcast('userNotifications', notifications);
          return Promise.resolve(currentUser);
        });
    } else {
      // attempting to reach out to sessionStorage to fetch for already authenticated user.
      let storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
      currentUser = new User(storedUser);

      let storedUserNotifications = JSON.parse(sessionStorage.getItem('currentUserNotifications'));
      let notifications = new Array();
      if (storedUserNotifications) {
        for (var msgKey in storedUserNotifications) {
          notifications.push(new Notification(msgKey, storedUserNotifications[msgKey].type, storedUserNotifications[msgKey].message, null));
        }
      }

      eventBus.broadcast('currentUserChanged', currentUser);
      eventBus.broadcast('userNotifications', notifications);
      return Promise.resolve(currentUser);
    }
  },

  loggedIn: () => {
    return (currentUser != null);
  },

  onChange: () => {}
};
