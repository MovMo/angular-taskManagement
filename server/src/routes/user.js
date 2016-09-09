(function() {
  var express, router,db,userBiz, commonBiz;

  express = require('express');
  router = express.Router();
  
  db = require('../libs/db');
  userBiz = require('../bizs/userBiz');
  commonBiz = require('../bizs/commonBiz');
	
	//登录
  router.post('/user/login',userBiz.login);
  //注册后台API
  router.post('/user/register',userBiz.validUserExists,userBiz.register);
  //注销
  router.post('/user/logout',commonBiz.setUserInfo,commonBiz.validateUserInfo,userBiz.logout);
  //自动登录
  router.post('/user/autologin',userBiz.autologin);
  
  module.exports = router;

}).call(this);