(function(){
	
	var db = require('../libs/db');
	var jwt = require('jsonwebtoken');
	var config = require('../config/config');
	
	function validUserExists(req,res,next){
	  	var body = req.body;
	  	console.log(body.username + body.password);
	  	//当没有用户没有输入数据的时候
	    if (!body || !body.username || !body.password) {
	      return next(new Error('请提交用户注册信息。'));
	    }
	    
	    //查询用户注册数据
		db.users.findOne({username : body.username},function(err,user){
			if(err){
				return next(err);
			}
			//判断用户是否已经注册
			if(user){
				return next(new Error('用户名已经注册！'));
			}else{
				next();
			}
		});
		
	}
	
	function register(req,res,next){
		var body,postData;
  	
	  	body = req.body;
	  	
	  	//获取到用户输入的数据
		postData = {
			username : body.username,//用户名
			password : body.password,//用户密码
			token : '',//
			expiredTime : Date.now()//过期时间
		}
		
		//存入数据到数据库
		db.users.insert(postData,function(err,user){
			if(err){
				return next(err);
			}
			res.json(true);
		});
	}
	
	
		
	function login(req, res, next) {
	    var password, username;
	    //获取用户输入的用户和密码
	    username = req.body.username;
	    password = req.body.password;
	    //查询（匹配用户名和密码）
	    return db.users.findOne({
	      username: username,
	      password: password
	    }, function(err, user) {
	      var expiredTime, token;
	      if (err) {
	        return next(err);
	      }
	      //判断用户是否存在
	      if (!user) {
	        return next(new Error('登录失败，请重试！未找到用户信息！'));
	      }
	      
	      //登录成功
	      token = jwt.sign({username: username}, config.secret);
	      expiredTime = Date.now() + 1000 * 60 * 60 * 24;
	      //更新数据
	      return db.users.update({
	        _id: user._id
	      }, {
	        $set: {
	          token: token,
	          expiredTime: expiredTime
	        }
	      }, function(err, numReplaced) {
	        if (err) {
	          return next(err);
	        }
	        if (numReplaced === 0) {
	          return next(new Error('登录失败，请重试！'));
	        }
	        return res.json({
	          token: token
	        });
	      });
	    });
	};
	
	//注销
	function logout(req,res,next){
		db.users.update(
			{_id : req.userInfo._id},
			{$set : {token : '',expiredTime : Date.now()}},
			function(err,numReplaced){
				if(err)return next(err);
				if(numReplaced === 0)return next(new Error('登录失败，请重试！'));
				res.json(true);
			}
		);
	}
	
	//自动登录
	function autologin(req,res,next){
		var token = req.body.token;
		db.users.findOne({token : token,expiredTime : {$gt:Date.now()}},function(err,user){
			if(err)return next(err);
			if(!user)return next(new Error('自动登录失败'));
			res.json(true);
		});
	}
	
	module.exports = {
		validUserExists : validUserExists,
		register : register,
		login : login,
		logout : logout,
		autologin : autologin
	}
	
}).call(this);
