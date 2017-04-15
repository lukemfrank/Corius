// navCtrl.js

import mainModule from '../mainModule';

mainModule.controller('NavbarController', ['Authentication', '$scope', function(Auth, $scope) {

  Auth.onCurrentUserChange(function(currentUser) {
    $scope.userName = currentUser ? currentUser.getDisplayName() : '';
  });

  Auth.onNotificationsChange(function(notifications) {
    $scope.notifications = notifications;
  });

  $scope.openMenu = function($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

}]);
