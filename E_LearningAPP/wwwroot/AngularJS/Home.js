var app = angular.module('app', ['ngRoute', 'angular.filter']);


app.service('svc', function ($http) {

});

app.controller('HomeController', function ($scope, svc) {
    $scope.GetToken_OnLoad = function () {
        var token = sessionStorage.getItem('LoginToken');
        if ((token !== null) && (token !== undefined) && (token !== '')) {
            /*location.href = '/Home';*/
        }

        else {
            alert('Anda harus login terlebih dahulu');
            location.href = '/';            
        }
    }

    /*$scope.GetToken_OnLoad();*/
});