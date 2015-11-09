module.exports = function( ) {
	var express = require( "express" ),
		router = express.Router(),
		controller = require('../controllers/PostController');

	router.route('/').
		get( controller.findAllPosts );
    
	return router;
};