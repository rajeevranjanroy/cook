'use strict';

// Require model modules.
var searchModel = require('../models/search');

var searchController = module.exports = {};

// Handle User create on POST
searchController.search = function (req, res) {
	  searchModel.search(req, res);
};
