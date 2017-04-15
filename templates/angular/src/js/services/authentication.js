// authentication.js

import config from '../appConfig';
import mainModule from '../mainModule';
import {User} from '../models/user.js';
import {Notification} from '../models/notification.js';

mainModule.service('Authentication', ['$q', '$http', '$rootScope', function Authentication($q, $http, $rootScope) {
  let loginErrors = null;
  let currentUser = null;
  let currentUserWatchers = [];
  let notifications = null;
  let notificationWatchers = [];

  function updateScope() {
    // Execute callbacks within $evalAsync() so Angular will notice any
    // changes to $scope variables that may be modified as a result. If
    // we didn't do this, $scope.$apply() would need to be called by each
    // callback after modifying $scope.
    $rootScope.$evalAsync(function(){
      for(let cbFcn of currentUserWatchers) {
        cbFcn(currentUser);
      }

      for(let cbFcn of notificationWatchers) {
        cbFcn(notifications);
      }
    });
  }

  return {
    loadCurrentUser: function() {
      let url = `${config.userServiceEndpoint}/user/me?autoRegister=true`;
      let deferred = $q.defer();
      currentUser = null;

      if(!sessionStorage.getItem('currentUser')) {
        $http.get(url).success(function(json) {

          if(json.item) {
            if(json.item.user) {
              currentUser = new User(json.item.user);
              sessionStorage.setItem('currentUser', JSON.stringify(currentUser.userData));
            }

            if(json.item.messages) {
              notifications = new Array();
              for(let msgKey in json.item.messages) {
                notifications.push(new Notification(msgKey, json.item.messages[msgKey].type, json.item.messages[msgKey].message, null));
              }
              sessionStorage.setItem('currentUserNotifications', JSON.stringify(notifications));
            }
            updateScope();
          }
          deferred.resolve(currentUser);
        }).error(function(response) {
          if (response && response['errors']) {
            loginErrors = response.errors;
          } else {
            loginErrors = [{message: 'An error occurred during authentication'}];
          }
          deferred.reject(response);
        });
      } else {
        // attempting to reach out to sessionStorage to fetch for already authenticated user.
        let storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
        currentUser = new User(storedUser);

        let storedUserNotifications = JSON.parse(sessionStorage.getItem('currentUserNotifications'));
        if (storedUserNotifications) {
          notifications = new Array();
          for (var msgKey in storedUserNotifications) {
            notifications.push(new Notification(msgKey, storedUserNotifications[msgKey].type, storedUserNotifications[msgKey].message, null));
          }
        }
        updateScope();
        deferred.resolve(currentUser);
      }

      return deferred.promise;
    },

    getErrors: function() {
      return loginErrors;
    },

    getCurrentUser: function() {
      return currentUser;
    },

    onCurrentUserChange: function(callbackFcn) {
      currentUserWatchers.push(callbackFcn);
      callbackFcn(currentUser);
    },

    onNotificationsChange: function(callbackFcn) {
      notificationWatchers.push(callbackFcn);
      callbackFcn(notifications);
    }

  };

}]);
