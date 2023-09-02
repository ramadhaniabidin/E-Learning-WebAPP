var app = angular.module('app', ['ngRoute', 'angular.filter']);


app.service('svc', function ($http) {
    this.svc_OnLoadGetProfile = function (token) {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Account/GetAccountDetailByToken/token/' + encodeURIComponent(token),
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }
});

app.controller('HomeController', function ($scope, svc) {
    // Variable declaration
    $scope.userName = "";
    // End region

    // This function retrieves the user data
    $scope.GetProfile_OnLoad = function () {
        var token = sessionStorage.getItem('LoginToken');
        var promise = svc.svc_OnLoadGetProfile(token);
        promise.then(function (response) {
            var resp_data = response.data;
            if (resp_data.Success) {
                console.log('Response Data: ', resp_data);
                var accountDetail = resp_data.accountDetail;

                $scope.userName = accountDetail.nama;
            }
        });
    }
    // End region



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
    $scope.GetProfile_OnLoad();
});