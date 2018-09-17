'use strict';

// Module dependencies
var connection = require('./../db');
var config = require('../config/config.json');
var md5 = require("md5");
var userModel = module.exports = {};


userModel.addUser = function(req, res){
   
	var resultData = {success: true, message: ""};
	
	var initialParams = {
        "params": {
            'fname' : req.query.fname || req.body.fname,
            'lname' : req.query.lname || req.body.lname,
            'phone' : req.query.phone || req.body.phone,
            'serviceType' : req.query.serviceType || req.body.serviceType,
            'city' : req.query.city || req.body.city,
            'address' : req.query.address || req.body.address,
			'email':req.query.email || req.body.email,
            'password' : req.query.password || req.body.password,
            'userType' : req.query.userType || req.body.userType,
            'date' : req.query.date || req.body.date,
			'status' : req.query.status || req.body.status,
            
        }
    };
    
    var userDetails = initialParams.params;
	var sqlquery ='SELECT * FROM users where email="'+userDetails.email+'"';
	//console.log(sqlquery);
	connection.query(sqlquery, function (err, result) {
        if (err) {
            resultData.success = false;
            resultData.message = "There was a database error when attempting to complete this action.";
            res.send(resultData);
        }
        if(result && result.length > 0) {
			
			resultData.success = false;
            resultData.message = "User already registered with email "+userDetails.email+" please try with other email id";
            res.send(resultData);
		}
		else
		{
			connection.query('INSERT INTO users (fname, lname, phone, serviceType, city, address, email, password, userType,date,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)', [userDetails.fname, userDetails.lname, userDetails.phone, userDetails.serviceType, userDetails.city, userDetails.address, userDetails.email, md5(userDetails.password), userDetails.userType,userDetails.date,userDetails.status], function (err, rows, fields) {
			if (err) {
				console.log("error while adding user : " + err);
				resultData.success = false;
				resultData.message = "There was a database error when attempting to complete this action.";
				res.send(resultData);
			} else {

				resultData.success = true;
				resultData.message = "The user "+userDetails.fname+" has been registered successfully.";
				resultData.userData = userDetails;
				res.send(resultData);
				//console.log(resultData);
			}
			});
		}	
	});
	
	
};

userModel.loginUser=function(req,res){
	
	var resultData = {success: true, message: ""};
	
	var initialParams = {
        "params": {
            'email' : req.query.email || req.body.email,
            'password' : req.query.password || req.body.password,
			'userType' : req.query.userType || req.body.userType,
            'status' : req.query.status || req.body.status
            
        }
    };
    
    var userDetails = initialParams.params;
	var sqlquery ='SELECT * FROM users where email="'+userDetails.email+'" and password="'+md5(userDetails.password)+'" and userType="'+userDetails.userType+'" and status=1';
	console.log(sqlquery);
	connection.query(sqlquery, function (err, result) {
        if (err) {
            resultData.success = false;
            resultData.message = "There was a database error when attempting to complete this action.";
            res.send(resultData);
        }
        if(result && result.length > 0) {
			
			resultData.success = true;
			resultData.message = "User details found";
			resultData.userinfo=result;
            res.send(resultData);
		}
		else
		{
			resultData.success = false;
            resultData.message = "Your user and password is wrong ! "
            res.send(resultData);
		}
		console.log(resultData);	
	});
}