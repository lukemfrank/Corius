// loginCtrl.js

import mainModule from '../mainModule';

mainModule.controller('LoginController', ['Application', '$scope', '$location', function(Application, $scope, $location) {

  Application.registerListener('ready', function() {
    $location.path('/');
  });

  Application.registerListener('userNotFound', function() {
    $location.path('/userNotFound');
  });

}]);