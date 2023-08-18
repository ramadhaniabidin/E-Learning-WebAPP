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

    this.svc_UpdatePassword = function (username, password) {
        var response = $http({
            method: 'POST',
            url: 'https://192.168.1.2:7290/E-learningAPI/Account/UpdatePassword/username/' + encodeURIComponent(username) + '/newPassword/' + encodeURIComponent(password),
            data: {},
            contentType: 'application/json charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_GetAllAccounts = function () {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.2:7290/E-LearningAPI/Account/GetAllAccounts',
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
            url: 'https://192.168.1.2:7290/E-learningAPI/Account/CreateAccount',
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
    $scope.ResetPassword = "";
    $scope.IsUsernameValid = false;
    $scope.Confirm_Password_Reset = "";

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
    

    $scope.CheckPassword = function () {
        var lowerCaseLetters = /[a-z]/g;
        if ($scope.ResetPassword.match(lowerCaseLetters)) {
            document.getElementById("letter1").classList.remove("invalid");
            document.getElementById("letter1").classList.add("valid");
        }

        else {
            document.getElementById("letter1").classList.remove("valid");
            document.getElementById("letter1").classList.add("invalid");
        }

        var upperCaseLetters = /[A-Z]/g;
        if ($scope.ResetPassword.match(upperCaseLetters)) {
            document.getElementById("capital1").classList.remove("invalid");
            document.getElementById("capital1").classList.add("valid");
        }

        else {
            document.getElementById("capital1").classList.remove("valid");
            document.getElementById("capital1").classList.add("invalid");
        }

        var numbers = /[0-9]/g;
        if ($scope.ResetPassword.match(numbers)) {
            document.getElementById("number1").classList.remove("invalid");
            document.getElementById("number1").classList.add("valid");
        }

        else {
            document.getElementById("number1").classList.remove("valid");
            document.getElementById("number1").classList.add("invalid");
        }

        if ($scope.ResetPassword.length >= 8) {
            document.getElementById("length1").classList.remove("invalid");
            document.getElementById("length1").classList.add("valid");
        }

        else {
            document.getElementById("length1").classList.remove("valid");
            document.getElementById("length1").classList.add("invalid");
        }
    }

    $scope.OnInputFocus = function () {
        document.getElementById("message1").style.display = "block";
    }

    $scope.OffInputFocus = function () {
        document.getElementById("message1").style.display = "none";
    }

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

    $scope.MatchPassword = function () {
        if (($scope.ResetPassword != $scope.Confirm_Password_Reset) || ($scope.Confirm_Password_Reset == null) || ($scope.Confirm_Password_Reset == '')) {
            document.getElementById('password_mismatch_alert').style.color = "red";
            document.getElementById('password_mismatch_alert').innerHTML = "☒ Use same password";
            document.getElementById('password_mismatch_alert').style.textAlign = "center";
        }

        else {
            document.getElementById('password_mismatch_alert').style.color = 'green';
            document.getElementById('password_mismatch_alert').innerHTML = '🗹 Password Matched';
        }
    }

    $scope.ConfirmPswFocus = function () {
        document.getElementById("password_mismatch_alert").style.display = "block";
    }

    $scope.ConfirmPswBlur = function () {
        document.getElementById("password_mismatch_alert").style.display = "none";
    }

    $scope.confirm.onkeyup = function () {
        if ($scope.SignUp_Password != $scope.Confirm_Password) {
            document.getElementById("wrong_psw_alert").style.color = "red";
            document.getElementById("wrong_psw_alert").innerHTML = "☒ Password tidak cocok";
            //document.getElementById("wrong_psw_alert").style.paddingLeft = "33px";
            document.getElementById("wrong_psw_alert").style.textAlign = "center";
            
        }
        else {
            document.getElementById('wrong_psw_alert').style.color = 'green';
            document.getElementById('wrong_psw_alert').innerHTML = '🗹 Password cocok';
            
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

        var cond1 = ($scope.login_username == null) || ($scope.login_username == undefined) || ($scope.login_username == '');
        var cond2 = ($scope.login_password == null) || ($scope.login_password == undefined) || ($scope.login_password == '');
        var cond3 = ($scope.AccountType == null) || ($scope.AccountType == undefined) || ($scope.AccountType == "")

        if (cond1 && cond2 && cond3) {
            alert('Please insert your username, password and select your account type');
        }

        else if (cond1) {
            alert('Please insert your username');
        }

        else if (cond2) {
            alert('Please insert your password');
        }

        else if (cond3) {
            alert('Please select your account type');
        }

        else {
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
        }


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
            //console.log("Accounts: ", $scope.accounts);
            //return response.data;
        });
    };


    $scope.UpdatePassword = function () {
        console.log('Username: ', $scope.ResetPassword_Username);
        console.log('New Password: ', $scope.ResetPassword);

        var promise = svc.svc_UpdatePassword($scope.ResetPassword_Username, $scope.ResetPassword);
        promise.then(function (response) {
            var resp_data = response.data;
            if (resp_data.ProcessSuccess) {
                alert(resp_data.InfoMessage);
                location.href = "/";
            }

            else {
                alert(resp_data.InfoMessage);
            }
        });
    }

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
        //console.log("Accounts: ", $scope.account);
        var prom = svc.svc_GetAllAccounts();
        prom.then(function (response) {
            $scope.account = response.data;
            var exists = $scope.account.some(function (item) {
                return item.username === $scope.SignUp_Username;
            });

            //if (exists) {
            //    alert("Object with username exists in the array.");
            //} else {
            //    alert("Object with username does not exist in the array.");
            //}

            console.log("Accounts: ", $scope.account);

            //kondisi 1 : Username tidak valid (kosong)
            var cond1 = ($scope.SignUp_Username == null) || ($scope.SignUp_Username == undefined) || ($scope.SignUp_Username == '');

            //kondisi 2 : Password tidak valid (kosong)
            var cond2 = ($scope.SignUp_Password == null) || ($scope.SignUp_Password == undefined) || ($scope.SignUp_Password == '');

            //kondisi 3 : Tipe akun tidak valid (kosong)
            var cond3 = ($scope.AccountType == null) || ($scope.AccountType == undefined) || ($scope.AccountType == "");

            //kondisi 4 : password tidak sama
            var cond4 = ($scope.SignUp_Password != $scope.Confirm_Password);

            if ($scope.AccountType == "siswa") {
                role_id = 1;
            }

            else {
                role_id = 2;
            }

            //validasi jika username, password, dan tipe akun dibiarkan kosong
            if (cond1 && cond2 && cond3) {
                alert('Mohon masukkan username, password, dan pilih tipe akun');
            }

            //validasi jika username dan password dibiarkan kosong
            else if (cond1 && cond2) {
                alert('Mohon masukkan username dan password');
            }

            //validasi jika username dan tipe akun dibiarkan kosong
            else if (cond1 && cond3) {
                alert('Mohon masukkan username dan pilih tipe akun Anda');
            }

            //validasi jika password dan tipe akun dibiarkan kosong
            else if (cond2 && cond3) {
                alert('Mohon masukkan password dan pilih tipe akun Anda');
            }

            else if (cond1) {
                alert('Mohon masukkan username');
            }

            else if (exists) {
                alert('Username sudah terpakai oleh pengguna lain, mohon ganti dengan username baru');
            }

            else if (cond2) {
                alert('Mohon masukkan password');
            }

            else if (cond3) {
                alert('Mohon pilih tipe akun Anda');
            }

            //validasi jika field password dan confirm_password tidak sama
            else if (cond4) {
                alert('Mohon gunakan password yang sama')
            }

            else {
                console.log('Username: ', $scope.SignUp_Username);
                console.log('Password: ', $scope.SignUp_Password);
                console.log('Tipe akun: ', $scope.AccountType);
                console.log('Id Peran: ', role_id);

                var param = {
                    account: {
                        'username': $scope.SignUp_Username,
                        'password': $scope.SignUp_Password,
                        'tanggal_daftar': new Date().toISOString(),
                        'id_peran': role_id
                    }
                };

                var signUpPromise = svc.svc_CreateAccount(param.account);
                signUpPromise.then(function (response) {
                    var resp_data = response.data;
                    if (resp_data.ProcessSuccess) {
                        alert('${resp_data.InfoMessage.toString()}');
                    }
                    else {
                        alert(resp_data.InfoMessage.toString());
                    }
                });

            }
            
        });
    }

    const loginBtn = angular.element(document.getElementById('login'));
    const signUpBtn = angular.element(document.getElementById('signup'));

    $scope.handleLogin = function () {
        let parent = loginBtn[0].parentNode.parentNode;
        let notParent = signUpBtn[0].parentNode;
        const element = parent.classList;

        document.getElementById('is_user_forgot_password').style.display = 'block';

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
        document.getElementById('is_user_forgot_password').style.display = 'none';

        if (!parent.classList.contains('slide-up')) {
            parent.classList.add('slide-up');
            //document.getElementById('is_user_forgot_password').style.display = 'none';
        }

        else {
            //document.getElementById('is_user_forgot_password').style.display = 'block';
            loginBtn[0].parentNode.parentNode.classList.add('slide-up');
            document.getElementById('login').style.pointerEvents = "";
            document.getElementById('signup').style.pointerEvents = "none";
            parent.classList.remove('slide-up');
        }
    }

    $scope.ShowModal = function () {
        document.getElementById("my_modal_1").style.display = "block";
    }

    //$scope.GetAccounts();
    //$scope.$watch('AccountType', function (newVal, oldVal) {
    //    if (newVal) {
    //        console.log("Account type: ", newVal);
    //    }
    //});
})