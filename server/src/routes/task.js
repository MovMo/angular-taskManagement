(function() {

  var express = require('express');
  var router = express.Router();
  var taskBiz = require('../bizs/taskBiz');
  var commonBiz = require('../bizs/commonBiz');
  var db = require('../libs/db');
  
  router.post('/task', commonBiz.setUserInfo, commonBiz.validateUserInfo, taskBiz.addTask);
  
  router.put('/task', commonBiz.setUserInfo, commonBiz.validateUserInfo, taskBiz.updateTask);
  
  router.get('/task/:id', commonBiz.setUserInfo, commonBiz.validateUserInfo, taskBiz.getTask);
  
  router.get('/task', commonBiz.setUserInfo, commonBiz.validateUserInfo, taskBiz.getTasks);
  
  module.exports = router;

}).call(this);