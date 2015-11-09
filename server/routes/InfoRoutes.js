module.exports = function( ) {
	var express = require( "express" ),
		router = express.Router(),
		controller = require('../controllers/InfoController');

	router.route('/contacto').
		get( controller.contact );


	router.route('/sobre-mi').
		get( controller.about );
    
	return router;
};