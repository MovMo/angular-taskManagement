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

}).call(this)