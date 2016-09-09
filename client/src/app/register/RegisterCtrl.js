(function(){
	
	angular.module('tmsApp').controller('RegisterCtrl',[
		'$scope','$http','$location','tmsUtil',
		function($scope,$http,$location,tmsUtil){
			$scope.userEntity = {
				username : '',
				password : '',
				passwordTo : ''
			}
			$scope.register = function(){
				if($scope.userEntity.password != $scope.userEntity.passwordTo){
					return alert('两次密码不一致！');
				}
				return $http.post(Tms.apiAddress + "/api/user/register", {
		          username: $scope.userEntity.username,
		          password: $scope.userEntity.passwordTo
		        }).then(function(res) {
		        	alert("注册成功！");
		          	//return $location.path('/login').replace();
		        }, tmsUtil.processHttpError);
			}
		}
	]);
	
}).call(this)
