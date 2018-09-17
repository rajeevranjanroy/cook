'use strict';

var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');
var search = require('../controllers/searchController');
module.exports = Routes;

function Routes(app)
 {
	router.post('/newuser/', user_controller.user_create_new);
	router.post('/login/', user_controller.user_login);
	router.post('/search/', search.search);
	app.use('/api/user',  router);
}

