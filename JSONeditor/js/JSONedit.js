'use strict';

var app = angular.module('exampleApp', ['JSONedit', 'angularFileUpload']);

function HomeCtrl($scope) {
    $scope.appTitle = "JSON Editor";
   }

function MainViewCtrl($scope, $filter) {

   
    $scope.jsonData = {
    };
    $scope.headerModal = "";
    $scope.bodyModal = "";
    $scope.$watch('jsonData', function(json) {
        $scope.jsonString = $filter('json')(json);
    }, true);

    $scope.$watch('jsonString', function(json) {
        try {
            $scope.jsonData = JSON.parse(json);
            $scope.wellFormed = true;
        } catch(e) {
            $scope.wellFormed = false;
        }
    }, true);
}
