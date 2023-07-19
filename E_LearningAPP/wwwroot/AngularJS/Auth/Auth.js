var app = angular.module('app', ['angular.filter']);

app.service('svc', function ($http) {

})

app.controller('ctrl', function ($scope, svc) {
    const loginBtn = angular.element(document.getElementById('login'));
    const signUpBtn = angular.element(document.getElementById('signup'));

    console.log(loginBtn[0].parentNode.parentNode);
    console.log(signUpBtn[0].parentNode);

    $scope.handleLogin = function () {
        let parent = loginBtn[0].parentNode.parentNode;
        let notParent = signUpBtn[0].parentNode;
        console.log(parent);
        console.log(notParent);
        /*console.log("Login Button after click: " + parent);*/
        const element = parent.classList;

        if (!parent.classList.contains('slide-up')) {
            parent.classList.add('slide-up');
           
            
        } else {
            signUpBtn[0].parentNode.classList.add('slide-up');
            parent.classList.remove('slide-up');
            document.getElementById('login').style.pointerEvents = "none";
            document.getElementById('signup').style.pointerEvents = "";
        }
        
        //console.log(element.value);

        //if (element.contains('slide-up')) {
        //    console.log("Success");
        //} else {
        //    console.log('Error');
        //}


        //angular.element(parent.classList).find((element) => {
        //    if (element !== "slide-up") {
        //        parent.classList.add('slide-up');
        //    } else {
        //        signUpBtn[0].parentNode.classList.add('slide-up');
        //        parent.classList.remove('slide-up');
        //    }
        //});
    };

    $scope.handleSignUp = function () {
        let parent = signUpBtn[0].parentNode;
        let notParent = loginBtn[0].parentNode;
        console.log(parent);
        console.log(notParent);
        /*console.log("Sign Up button after click: " + parent);*/
        if (!parent.classList.contains('slide-up')) {
            parent.classList.add('slide-up');
        } else {
            
            loginBtn[0].parentNode.parentNode.classList.add('slide-up');
            document.getElementById('login').style.pointerEvents = "";
            document.getElementById('signup').style.pointerEvents = "none";
            parent.classList.remove('slide-up');
        }
        //angular.element(parent.classList).find((element) => {
        //    if (element !== "slide-up") {
        //        parent.classList.add('slide-up');
        //    } else {
        //        loginBtn[0].parentNode.classList.add('slide-up');
        //        parent.classList.remove('slide-up');
        //    }
        //});
    }
})