angular.module('bacnvanilla.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.selected=0;

    $scope.menu = [{
        "title": "Articles",
        "link": "articles"
    }, {
        "title": "Create New Article",
        "link": "articles/create"
    }];


    $scope.alert = function(msg){
        alert(msg);
    }

    $scope.CustomersMenu = [{
        "title": "View",
        "link": "customers"
    }, {
        "title": "Create New Customer",
        "link": "customers/create"
    }];
    
    $scope.isCollapsed = false;
}]);