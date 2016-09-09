(function(){
	
	var Datastore = require('nedb');
	var config = require('../config/config');
	
	var db = {};
	var dbPath = config.dbFilePath;
	
	db.users = new Datastore(dbPath + 'users.db');
	db.users.loadDatabase();
	db.tasks = new Datastore(dbPath + 'tasks.db');
	db.tasks.loadDatabase();
	
	//初始化用户名和密码
	//db.users.insert({username:'mov',password:'123456'});
	
	//db.users = new Datastore({filename : 'path/to/atafile',autoload : true});
	
	module.exports = db;
	
}).call(this);
