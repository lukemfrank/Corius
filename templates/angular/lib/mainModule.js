// mainModule.js

import angular from 'angular';
import 'angular-cookies';
import 'angular-resource';
import 'angular-ui-router';
<% if (uiFramework === 'materialdesign') { %>
import 'angular-material';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
<% } %>
import appConfig from './appConfig';
// Use SystemJS/plugin-text to load templates as strings
import aboutTpl from './templates/about.tpl.html!text';
import loginTpl from './templates/login.tpl.html!text';
import mainTpl from './templates/main.tpl.html!text';
import navTpl from './templates/nav.tpl.html!text';
import loginFailedTpl from './templates/loginFailed.tpl.html!text';

var mainModule = angular.module('Main', [
  'ngCookies',
  'ngResource',
  <% if (uiFramework === 'materialdesign') { %>
  'ngMaterial',<% } %>
  'ui.router'
]);
  
mainModule
  // Note that we are using the 'inline array annotations' method of dependency injection
  .config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

    // In many cases Corius-generated apps will make TLS requests to servers that require
    // a client certificate. Also, making cross-origin requests may be common during
    // development (e.g., website running on localhost but making authentication requests
    // to the User Service running on another host). To ensure that these cross-origin,
    // client certificate-based requests work in Firefox we need to configure the underlying
    // XHR object to have 'withCredentials' enabled. Without this, Firefox won't include
    // the client certificate when making cross-origin, XHR requests.
    $httpProvider.defaults.withCredentials = true;
    
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/');

    // Use history.pushState for routing history
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        // Note that we are excluding the 'nav' view. This will cause it
        // to be hidden while the user is being logged in.
        views: {
          'content': {
            template: loginTpl
          }
        }
      })
      .state('loginFailed', {
        url: '/loginFailed',
        views: {
          'content': {
            template: loginFailedTpl,
            controller: ['Authentication', '$scope', function(Authentication, $scope) {
              let errMsg = '';
              Authentication.getErrors().map(err => { errMsg += ` ${err.message}`; });
              $scope.errMsg = errMsg;
            }]
          }
        }
      })
      .state('home', {
        url: '/',
        views: {
          'nav': {
            template: navTpl,
            controller: 'NavbarController'
          },
          'content': {
            template: mainTpl,
            controller: 'MainController'
          }
        }
      })
      .state('about', {
        url: '/about',
        views: {
          'nav': {
            template: navTpl,
            controller: 'NavbarController'
          },
          'content': {
            template: aboutTpl
          }
        }
      });
  }])
  .run(['Authentication', 'Application', '$location', '$state', '$rootScope', function(Authentication, Application, $location, $state, $rootScope) {
    if (appConfig.requireAuthentication) {
      $state.go('login');

      Authentication.loadCurrentUser().then(function() {
        $state.go('home');
      }).catch(function() {
        $state.go('loginFailed');
      });

      // Ensure that users are only allowed to go to /login until we have a current user.
      $rootScope.$on('$locationChangeStart', function() {
        if(!Authentication.getCurrentUser() && $location.path() !== '/login' && $location.path() !== '/loginFailed') {
          $location.path('login');
        }
      });
    } else {
      $state.go('home');
    }
  }]);

angular.element(document).ready(function() {
  // Note that we are manually bootstraping Angular here instead of using the
  // ng-app directive in <html> or <body>.
  return angular.bootstrap(document.body, [mainModule.name], {
    strictDi: true
  });
});

export default mainModule;
