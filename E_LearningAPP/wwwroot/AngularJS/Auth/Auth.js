var app = angular.module('app', ['angular.filter']);

app.service('svc', function ($http) {
    this.svc_GetAccountID = function (username, password) {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.142.232:7290/E-LearningAPI/Account/GetAccountID/username/' + encodeURIComponent(username) + '/password/' + encodeURIComponent(password),
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_GetAllAccounts = function () {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.142.232:7290/E-LearningAPI/Account/GetAllAccounts',
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }
})

app.controller('ctrl', function ($scope, svc) {
    $scope.accounts = [];
    $scope.login_username = '';
    $scope.login_password = '';

    $scope.GetAccountID = function () {
        var accountID;
        console.log("Username: " + $scope.login_username);
        console.log("Password: " + $scope.login_password);
        var promise = svc.svc_GetAccountID($scope.login_username, $scope.login_password);
        promise.then(function (response) {
            accountID = response.data;
            if ((accountID === null) || (accountID === undefined) || (accountID === 0) || (accountID === '')) {
                alert("Login Error");
            }

            else {
                alert("Login Success");
            }
        });
    };

    $scope.GetAccounts = function () {
        var promise = svc.svc_GetAllAccounts();
        promise.then(function (response) {
            $scope.accounts = response.data;
        });
    };



    const loginBtn = angular.element(document.getElementById('login'));
    const signUpBtn = angular.element(document.getElementById('signup'));

    $scope.handleLogin = function () {
        let parent = loginBtn[0].parentNode.parentNode;
        let notParent = signUpBtn[0].parentNode;
        const element = parent.classList;

        if (!parent.classList.contains('slide-up')) {
            parent.classList.add('slide-up');
           
            
        } else {
            signUpBtn[0].parentNode.classList.add('slide-up');
            parent.classList.remove('slide-up');
            document.getElementById('login').style.pointerEvents = "none";
            document.getElementById('signup').style.pointerEvents = "";
        }
    };

    $scope.handleSignUp = function () {
        let parent = signUpBtn[0].parentNode;
        let notParent = loginBtn[0].parentNode;
        if (!parent.classList.contains('slide-up')) {
            parent.classList.add('slide-up');
        } else {
            
            loginBtn[0].parentNode.parentNode.classList.add('slide-up');
            document.getElementById('login').style.pointerEvents = "";
            document.getElementById('signup').style.pointerEvents = "none";
            parent.classList.remove('slide-up');
        }
    }


    $scope.GetAccounts();
})