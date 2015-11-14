module.exports = function() {
	var express = require( "express" ),
		router = express.Router(),
		controller = require('../controllers/AdminController');

	router.route('/admin').
		get( controller.index );

	router.route('/admin/post/add').
		get( controller.addPostView ).
		post( controller.addPost );


	router.route('/admin/post/:slug').
		get( controller.findPost ).
		post( controller.editPost ).
		delete( controller.deletePost );

    
	return router;
};