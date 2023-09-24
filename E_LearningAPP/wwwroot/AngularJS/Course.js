var app = angular.module('app', ['ngRoute', 'angular.filter']);

app.service('svc', function ($http) {

});

app.controller('CourseController', function ($scope, svc) {
    $scope.ToggleAccordion = function (subject) {
        console.log(subject);
        var panel = document.getElementById(subject + '-panel');
        var allPanels = document.querySelectorAll('.panel');

        allPanels.forEach(function (otherPanel) {
            if (otherPanel != panel) {
                otherPanel.style.maxHeight = null;
            }
        });

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        }
        else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }

    $scope.ToggleAccordion1 = function (subject) {
        var panel = document.getElementById(subject + '-panel');
        var allPanels = document.querySelectorAll('.panel');

        allPanels.forEach(function (otherPanel) {
            if (otherPanel != panel) {
                otherPanel.style.maxHeight = null;
            }
        });

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        }
        else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }

    $scope.ToggleCurricullum1 = function (subject, grade) {
        var panel_id = (subject + '-' + grade + '-panel');
        console.log('Selected panel id : ', panel_id);

        var parentPanel = document.getElementById(subject + '-panel');
        var panel = document.getElementById(panel_id);

        console.log('Selected panel : ', panel)

        var allCurrPanels = document.querySelectorAll('.curricullum');
        allCurrPanels.forEach(function (item) {
            if (item != panel) {
                item.style.maxHeight = null;
                item.style.marginBottom = null;
            }
        });

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.marginBottom = null;
        }

        else {
            var parentMaxHeight = parentPanel.scrollHeight;
            var childMaxHeight = panel.scrollHeight;
            var totalMaxHeight = parentMaxHeight + childMaxHeight;

            panel.style.maxHeight = panel.scrollHeight + 'px';

            panel.style.marginBottom = '2.5%';
            parentPanel.style.maxHeight = totalMaxHeight + 'px';
        }
    }

    $scope.ToggleCurricullum = function (subject, grade) {
        var parentPanel;
        var panel;
        var other_panel_1;
        var other_panel_2;
        console.log("Subject : ", subject);
        console.log("Grade : ", grade);
        if (subject == 'physics') {
            parentPanel = document.getElementById('physics-panel');
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
        }
        else if (subject == 'math') {
            parentPanel = document.getElementById('math-panel');
            if (grade == 10) {
                panel = document.getElementById('math-10-panel');
                other_panel_1 = document.getElementById('math-11-panel');
                other_panel_2 = document.getElementById('math-12-panel');
            }
            else if (grade == 11) {
                panel = document.getElementById('math-11-panel');
                other_panel_1 = document.getElementById('math-10-panel');
                other_panel_2 = document.getElementById('math-12-panel');
            }
            else if (grade == 12) {
                panel = document.getElementById('math-12-panel');
                other_panel_1 = document.getElementById('math-10-panel');
                other_panel_2 = document.getElementById('math-11-panel');
            }
        }
        else if (subject == 'chemistry') {
            parentPanel = document.getElementById('chemistry-panel');
            if (grade == 10) {
                panel = document.getElementById('chemistry-10-panel');
                other_panel_1 = document.getElementById('chemistry-11-panel');
                other_panel_2 = document.getElementById('chemistry-12-panel');
            }
            else if (grade == 11) {
                panel = document.getElementById('chemistry-11-panel');
                other_panel_1 = document.getElementById('chemistry-10-panel');
                other_panel_2 = document.getElementById('chemistry-12-panel');
            }
            else if (grade == 12) {
                panel = document.getElementById('chemistry-12-panel');
                other_panel_1 = document.getElementById('chemistry-10-panel');
                other_panel_2 = document.getElementById('chemistry-11-panel');
            }
        }


        console.log(panel);
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.marginBottom = null;

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
            other_panel_1.style.marginBottom = null;
            other_panel_2.style.marginBottom = null;

            panel.style.marginBottom = '2.5%';
            parentPanel.style.maxHeight = totalMaxHeight + 'px';
        }
    };
});