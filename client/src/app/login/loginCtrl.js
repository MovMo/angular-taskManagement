(function() {
  angular.module('tmsApp').controller('LoginCtrl', [
    '$scope','$location','$http','tmsUtil',
    function($scope,$location,$http,tmsUtil){
      $scope.userEntity = {
        username: '',
        password: '',
        rememberMe: false
      };
      
     	$scope.doLogin = function() {
        $http.post(Tms.apiAddress + "/api/user/login", {
          username: $scope.userEntity.username,
          password: $scope.userEntity.password
        }).then(function(res) {
        	var token = res.data.token;
        	if($scope.userEntity.rememberMe){
        		localStorage.setItem('username', $scope.userEntity.username);
        	}else{
						localStorage.removeItem('username');
        	}
        	//把token应用于所有
        	$http.defaults.headers.common['x-token'] = token;
        	localStorage.setItem('x-token', token);
          return $location.path('/').replace();
        }, tmsUtil.processHttpError);
      };
      function init(){
		  	var username;
		    username = localStorage.getItem('username');
		    if (username) {
		      $scope.userEntity.rememberMe = true;
		      return $scope.userEntity.username = username;
		    }
		  }
      init();
    }
  ]);
  
  
  

}).call(this);

