angular.module('tmsApp')
.controller('LoginCtrl', ['$scope', ($scope) ->
  $scope.userEntity = {
    username: ''
    password: ''
  }
  $scope.rememberMe = false
  $scope.doLogin = ->
    console.log($scope.userEntity)
])