// mainCtrl.js

import mainModule from '../mainModule';

mainModule.controller('MainController', ['$scope', function($scope) {

  let deps = [
    {name: 'AngularJS', description: 'Superheroic JavaScript MVW framework'}
  ];
  <% if (cssFramework === 'sass') { %>
  deps.push({name: 'SASS', description: 'Sass CSS preprocessor'});
  <% } else if (cssFramework === 'less') { %>
  deps.push({name: 'LESS', description: 'Less CSS preprocessor'});
  <% } %>
  <% if (uiFramework === 'bootstrap') { %>
  deps.push({name: 'Bootstrap', description: 'HTML, CSS, and JS framework for responsive web projects'});
  <% } else if (uiFramework === 'materialdesign') { %>
  deps.push({name: 'Angular Material', description: 'implementation of Material Design in Angular'});
  <% } %>

  $scope.deps = deps;

}]);

export default mainModule;
