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
    $scope.SignUp_Username = "";
    $scope.SignUp_Password = "";
    $scope.Confirm_Password = "";
    $scope.AccountType = "";

    $scope.myInput = document.getElementById("psw");
    $scope.letter = document.getElementById("letter");
    $scope.capital = document.getElementById("capital");
    $scope.number = document.getElementById("number");
    $scope.length = document.getElementById("length");
    $scope.confirm = document.getElementById("confirm_psw");
    $scope.password_field = document.getElementById("password_field");

    $scope.svg1 = document.getElementById("svg1");
    $scope.svg2 = document.getElementById("svg2");


    $scope.svg1.addEventListener("click", function () {
        this.classList.toggle("close");
        setTimeout(() => {
            $scope.myInput.type = $scope.myInput.type === "password" ? "text" : "password";
        }, 125);
    });

    $scope.svg2.addEventListener("click", function () {
        this.classList.toggle("close");
        setTimeout(() => {
            $scope.confirm.type = $scope.confirm.type === "password" ? "text" : "password";
        }, 125);
    });

    $scope.myInput.onfocus = function () {
        document.getElementById("message").style.display = "block";
    }

    $scope.myInput.onblur = function () {
        document.getElementById("message").style.display = "none";
    }

    $scope.myInput.onkeyup = function () {
        var lowerCaseLetters = /[a-z]/g;
        if ($scope.myInput.value.match(lowerCaseLetters)) {
            $scope.letter.classList.remove("invalid");
            $scope.letter.classList.add("valid");
        }
        else {
            $scope.letter.classList.remove("valid");
            $scope.letter.classList.add("invalid");
        }

        var upperCaseLetters = /[A-Z]/g;
        if ($scope.myInput.value.match(upperCaseLetters)) {
            $scope.capital.classList.remove("invalid");
            $scope.capital.classList.add("valid");
        }
        else {
            $scope.capital.classList.remove("valid");
            $scope.capital.classList.add("invalid");
        }

        var numbers = /[0-9]/g;
        if ($scope.myInput.value.match(numbers)) {
            $scope.number.classList.remove("invalid");
            $scope.number.classList.add("valid");
        }
        else {
            $scope.number.classList.remove("valid");
            $scope.number.classList.add("invalid");
        }

        if ($scope.myInput.value.length >= 8) {
            $scope.length.classList.remove("invalid");
            $scope.length.classList.add("valid");
        } else {
            $scope.length.classList.remove("valid");
            $scope.length.classList.add("invalid");
        }
    }

    $scope.confirm.onkeyup = function () {
        if ($scope.SignUp_Password != $scope.Confirm_Password) {
            document.getElementById("wrong_psw_alert").style.color = "red";
            document.getElementById("wrong_psw_alert").innerHTML = "☒ Use same password";
            document.getElementById("wrong_psw_alert").style.paddingLeft = "33px";
        }
        else {
            document.getElementById('wrong_psw_alert').style.color = 'green';
            document.getElementById('wrong_psw_alert').innerHTML = '🗹 Password Matched';
            
        }
    }

    $scope.confirm.onblur = function () {
        document.getElementById("wrong_psw_alert").style.display = "none";
    }

    $scope.confirm.onfocus = function () {
        document.getElementById("wrong_psw_alert").style.display = "block";
    }

    //$scope.validate_password = function () {
    //    var password = document.getElementById("psw").value;
    //    var confirm = document.getElementById("confirm_psw").value;

    //    if (password !== confirm) {
    //        document.getElementById("wrong_psw_alert").style.color = "red";
    //        document.getElementById("wrong_psw_alert").innerHTML = "☒ Use same password";
    //        document.getElementById("wrong_psw_alert").style.paddingLeft = "33px";
    //    }

    //    else {
    //        document.getElementById('wrong_psw_alert').style.color = 'green';
    //        document.getElementById('wrong_psw_alert').innerHTML = '🗹 Password Matched';
    //    }
    //}

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
    $scope.$watch('AccountType', function (newVal, oldVal) {
        if (newVal) {
            console.log("Account type: ", newVal);
        }
    });
})