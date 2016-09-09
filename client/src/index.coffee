angular.module('tmsApp', ['ngRoute'])
.config(['$routeProvider', ($routeProvider) ->
  $routeProvider.when('/login', {
    templateUrl: '/app/login/index.html'
    controller: 'LoginCtrl'
  }).when('/register', {
    templateUrl: '/app/register/index.html'
    controller: 'RegisterCtrl'
  })
])
.run(['$location', ($location) ->
  $location.path('/login').replace()
])