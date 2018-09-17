'use strict';

// Require model modules.
var userModel = require('../models/user');

var userController = module.exports = {};

// Handle User create on POST
userController.user_create_new = function (req, res) {
	  userModel.addUser(req, res);
};

// user Login on POST
userController.user_login = function (req, res) {
	  userModel.loginUser(req, res);
};