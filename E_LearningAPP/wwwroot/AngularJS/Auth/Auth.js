var app = angular.module('app', ['angular.filter']);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return JSON.stringify(data, function (key, value) {
            return (typeof value === 'string') ? value : value;
        });
    };
}]);


app.service('svc', function ($http) {
    this.svc_GetAccountID = function (username, password) {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Account/GetAccountID/username/' + encodeURIComponent(username) + '/password/' + encodeURIComponent(password),
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_GetAccountByUsername = function (username) {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.3:7290/E-learningAPI/Account/GetAccountByUsername/username/' + encodeURIComponent(username),
            data: {},
            contentType: 'aplication/json charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_GetAllAccounts = function () {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Account/GetAllAccounts',
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_CreateAccount = function (account) {
        var param = {
            account: account
        };

        console.log("Param: ", param);

        var response = $http({
            method: 'POST',
            url: 'https://192.168.1.3:7290/E-learningAPI/Account/CreateAccount',
            data: account,
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
    $scope.ResetPassword_Username = "";
    $scope.IsUsernameValid = false;

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
            //document.getElementById("wrong_psw_alert").style.paddingLeft = "33px";
            document.getElementById("wrong_psw_alert").style.textAlign = "center";
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
                location.href = "/Home";
            }
        });
    };

    $scope.ToggleModal = function () {
        document.getElementById('my_modal_1').style.display = 'none';
        document.getElementById('reset_psw_modal').style.display = 'block';
    }

    $scope.GetAccountByUsername = function () {
        if (($scope.ResetPassword_Username == null) || ($scope.ResetPassword_Username == undefined) || ($scope.ResetPassword_Username == '')) {
            alert('Please insert your username');
        }
        else {
            var promise = svc.svc_GetAccountByUsername($scope.ResetPassword_Username);
            promise.then(function (response) {
                var resp_data = response.data;
                console.log('Response data: ', response.data);
                if (resp_data.ProcessSuccess) {
                    alert(resp_data.InfoMessage);
                    $scope.ToggleModal();
                }

                else {
                    alert(resp_data.InfoMessage);
                }
            });
        }
    }

    $scope.GetAccounts = function () {
        var promise = svc.svc_GetAllAccounts();
        promise.then(function (response) {
            $scope.accounts = response.data;
            console.log("Accounts: ", $scope.accounts);
        });

        
    };


    function formatDate(date) {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        var hours = String(date.getHours()).padStart(2, '0');
        var minutes = String(date.getMinutes()).padStart(2, '0');
        var seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    $scope.SignUp = function () {
        var role_id = 0;
        if ($scope.AccountType == "siswa") {
            role_id = 1;
        }

        else {
            role_id = 2;
        }

        if (($scope.AccountType == null) || ($scope.AccountType == undefined) || ($scope.AccountType == "")) {
            alert("Choose the account type!");
        }

        else {
            console.log("Username: ", $scope.SignUp_Username);
            console.log("Password: ", $scope.SignUp_Password);
            console.log("Account Type: ", $scope.AccountType);
            console.log("Register Date: ", new Date().toLocaleDateString());
            console.log("Role ID: ", role_id);
        }

        var param = {
            account: {
                'username': $scope.SignUp_Username,
                'password': $scope.SignUp_Password,
                'tanggal_daftar': new Date().toISOString(),
                'id_peran': role_id
            }
        };
            

        var promise = svc.svc_CreateAccount(param.account);
        promise.then(function (response) {
            var resp_data = response.data;
            console.log("Response data: ", resp_data);
            if (resp_data.ProcessSuccess) {
                alert(resp_data.InfoMessage.toString() + ", Logging you in");
                location.href = "/Home";
            }

            else {
                alert(resp_data.InfoMessage.toString());
                window.location.href = "/";
            }
        });
    }

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

    $scope.ShowModal = function () {
        document.getElementById("my_modal_1").style.display = "block";
    }

    $scope.GetAccounts();
    //$scope.$watch('AccountType', function (newVal, oldVal) {
    //    if (newVal) {
    //        console.log("Account type: ", newVal);
    //    }
    //});
})