angular.module('bacnvanilla.system')
.controller('IndexController', ['$scope','$window','$log','Global','$timeout',function($scope, $window, $log, Global,$timeout){
    $scope.global = Global;
    $scope.searchListingTerm = "";


}]);

