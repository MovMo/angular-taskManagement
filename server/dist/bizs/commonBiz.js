var db = require('../libs/db');
var jwt = require('jsonwebtoken');

function setUserInfo(req,res,next){
	var token = req.headers['x-token'];
	
	db.users.findOne({token : token,expiredTime : {$gt : Date.now()}},function(err,user){
		if(!err)req.userInfo = user;
		next();
	});
}

function validateUserInfo(req,res,next){
	if(!req.userInfo){
		res.status(401);
		res.send('未授权');
		return;
	}
	next();
}

module.exports = {
	setUserInfo : setUserInfo,
	validateUserInfo : validateUserInfo
}