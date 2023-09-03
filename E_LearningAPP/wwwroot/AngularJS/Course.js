var app = angular.module('app', ['ngRoute', 'angular.filter']);

app.service('svc', function ($http) {

});

app.controller('CourseController', function ($scope, svc) {
    $scope.ShowPhysicsAccordion = function () {
        var accordion = document.getElementById('btn-accordion');
        var panel = document.getElementById('panel1');
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        }

        else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    };
});