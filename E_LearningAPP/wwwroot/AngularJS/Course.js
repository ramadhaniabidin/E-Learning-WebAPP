﻿var app = angular.module('app', ['ngRoute', 'angular.filter']);

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

    $scope.ToggleCurricullum = function (grade) {
        var parentPanel = document.getElementById('physics-panel');
        var panel;
        var other_panel_1;
        var other_panel_2;
        if (grade == 10) {
            panel = document.getElementById('physics-10-panel');
            other_panel_1 = document.getElementById('physics-11-panel');
            other_panel_2 = document.getElementById('physics-12-panel');
        }
        else if (grade == 11) {
            panel = document.getElementById('physics-11-panel');
            other_panel_1 = document.getElementById('physics-10-panel');
            other_panel_2 = document.getElementById('physics-12-panel');
        }
        else if (grade == 12) {
            panel = document.getElementById('physics-12-panel');
            other_panel_1 = document.getElementById('physics-10-panel');
            other_panel_2 = document.getElementById('physics-11-panel');
        }


        
        console.log(panel);
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.marginBottom = null;
            other_panel_1.style.marginBottom = null;
            other_panel_2.style.marginBottom = null;
            console.log('Panel Scrollheight', panel.scrollHeight);
        }
        else {
            console.log('Panel Scrollheight', panel.scrollHeight);
            var parentMaxHeight = parentPanel.scrollHeight;
            var childMaxHeight = panel.scrollHeight;
            var totalMaxHeight = parentMaxHeight + childMaxHeight;

            panel.style.maxHeight = panel.scrollHeight + 'px';
            other_panel_1.style.maxHeight = null;
            other_panel_2.style.maxHeight = null;

            panel.style.marginBottom = '2.5%';
            parentPanel.style.maxHeight = totalMaxHeight + 'px';
        }
    };

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