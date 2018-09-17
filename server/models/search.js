'use strict';

// Module dependencies
var connection = require('./../db');
var config = require('../config/config.json');
var searchModel = module.exports = {};


searchModel.search = function(req, res){
   
	var resultData = {success: true, message: ""};
	
	var initialParams = {
        "params": {
            'searchtext' : req.query.searchtext || req.body.searchtext,
            'servicetype' : req.query.servicetype || req.body.servicetype,
            
            
        }
    };
    
    var searchDetails = initialParams.params;
	var sqlquery ='SELECT * FROM users where serviceType="'+searchDetails.servicetype+'" and (address like"%'+searchDetails.searchtext+'%" or city like "%'+searchDetails.searchtext+'%")';
	//console.log(sqlquery);
	connection.query(sqlquery, function (err, result) {
        if (err) {
            resultData.success = false;
            resultData.message = "There was a database error when attempting to complete this action.";
            res.send(resultData);
        }
        if(result && result.length > 0) {
			
			resultData.success = true;
			resultData.result = result ;
            resultData.message = "Result Found";
            res.send(resultData);
		}
		else{
			resultData.success = false;
            resultData.message = "Result Not Found";
            res.send(resultData);
		}
			
	});
	
	
};
