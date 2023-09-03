var app = angular.module('app', ['ngRoute', 'angular.filter']);

app.service('svc', function ($http) {

});

app.controller('CourseController', function ($scope, svc) {
    $scope.ToggleAccordion = function (subject) {
        var panel;
        if (subject == 'physics') {
            panel = document.getElementById('physics-panel');
        }
        else if (subject == 'math') {
            panel = document.getElementById('math-panel');
        }
        else if (subject == 'chemistry') {
            panel = document.getElementById('chemistry-panel');
        }

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        }
        else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }


    $scope.ShowPhysicsAccordion = function () {
        var panel = document.getElementById('panel1');
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        }

        else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    };
});