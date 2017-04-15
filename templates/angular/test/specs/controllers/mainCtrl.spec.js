// mainCtrl.spec.js

import angular from 'angular';
import 'angular-mocks';

import 'src/js/app';
import mainModule from 'src/js/controllers/mainCtrl';

describe('Main Controller', function() {
  var ctrl, $rootScope, $state, $scope;

  beforeEach(angular.mock.module(mainModule.name));

  beforeEach(inject(function(_$rootScope_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  describe('initial state', function() {
    beforeEach(inject(function($controller) {
      ctrl = $controller('MainController', {
        $rootScope: $rootScope,
        $scope: $scope
      });
    }));

    it('1st user defined dependency should be AngularJs', function() {
      expect($scope.deps[0].name).to.eql('AngularJS');
    });
  });
});
