// MODULE
var angularApp = angular.module('angularApp', ['ngMessages']);

// CONTROLLERS
angularApp.controller('mainController',  function ($scope, $log) {
    $log.log('ok man');
});
