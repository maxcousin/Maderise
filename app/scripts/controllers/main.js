'use strict';

/**
 * @ngdoc function
 * @name maderiseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the maderiseApp
 */
angular.module('maderiseApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
});
angular.module('maderiseApp')
    .controller('LoginCtrl',['$scope', function ($scope) {
  $scope.yo = 'OKLM';



}]);
