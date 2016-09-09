(function() {
  angular.module('tmsApp', ['ngRoute']).config([
    '$routeProvider', function($routeProvider) {
      $routeProvider.when('/login', {
        templateUrl: './app/login/index.html',
        controller: 'LoginCtrl'
      }).when('/register', {
        templateUrl: './app/register/index.html',
        controller: 'RegisterCtrl'
      }).when('/', {
        templateUrl: './app/index/index.html',
        controller: 'IndexCtrl'
      });
   	}
  ]).run([
    '$location','$http','$route', function($location,$http,$route) {
    	var token = localStorage.getItem('x-token');
    	if(token){
    		$http.post(Tms.apiAddress + '/api/user/autologin',{token : token})
    		.then(function(res){
    			if(res.data == true){
    				$http.defaults.headers.common['x-token'] = token;
	        	localStorage.setItem('x-token', token);
	          $route.reload();
    			}else{
    				$location.path('/login').replace();
    			}
    		},function(){
    			$location.path('/login').replace();
    		});
    	}else{
    		$location.path('/login').replace();
    	}
    }
  ]);

}).call(this)

;
(function() {
  angular.module('tmsApp').factory('tmsUtil', [
    function() {
      var processHttpError;
      processHttpError = function(res) {
        var data;
        data = res.data;
        if (data.message) {
          return alert(data.message);
        }
      };
      return {
        processHttpError: processHttpError
      };
    }
  ]);

}).call(this);
;
(function() {
  angular.module('tmsApp').controller('IndexCtrl', [
    '$scope','$location','tmsUtil','$http',function($scope,$location,tmsUtil,$http) {
      $scope.task = {
      	taskName : ''
      };
      $scope.taskList = [];
      
      //初始化数据
      function initData(){
      	$http.get(Tms.apiAddress + '/api/task')
      	.then(function(res){
      		var tasks = res.data;
      		$scope.taskList = tasks;
      	},tmsUtil.processHttpError);
      }
      
      //退出系统
      $scope.exint = function(){
      	$http.post(Tms.apiAddress + '/api/user/logout')
      	.then(function(res){
      		alert('注销成功！');
      		$location.path('/login');
      	},tmsUtil.processHttpError);
      }
      
      $scope.changeTaskStatus = function(task){
      	task.status = task.checked ? 'Finish' : 'InProgress';
      }
      
      //编辑
      $scope.editTask = function(task){
      	task.isEditing = true;
      	task.tempTaskName = task.taskName;
      }
      
      //取消
      $scope.cancelEditTask = function(task){
      	task.isEditing = false;
      }
      
      //保存
      $scope.saveTask = function(task,index){
      	var oldTaskName = task.taskName;
      	task.taskName = task.tempTaskName;
      	$http.put(Tms.apiAddress + "/api/task",task)
      	.then(function(res){
      		alert('保存成功！');
      		task.isEditing = false;
      	},function(res){
      		task.taskName = oldTaskName;
      		tmsUtil.processHttpError(res);
      	});
      }
      
      //删除
      $scope.deleteTask = function(task,index){
      	task.deleted = true;
      	$http.put(Tms.apiAddress + "/api/task",task)
      	.then(function(res){
      		$scope.taskList.splice(index,1);
      	},tmsUtil.processHttpError);
      }
      
      //添加任务
      $scope.addTask = function(){
      	var task = angular.copy($scope.task);
      	
      	$http.post(Tms.apiAddress + "/api/task", {
          taskName: $scope.task.taskName
       }).then(function(res) {
       		var newTask = res.data;
       		task._id = newTask._id;
       		task.deleted = newTask.deleted;
	      	$scope.taskList.push(task);
      		$scope.task.taskName = '';
        }, tmsUtil.processHttpError);
       
      }
      
      initData();
      
    }
  ]);

}).call(this);
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

;
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
