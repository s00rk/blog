module.exports = function() {
	var express = require( "express" ),
		router = express.Router(),
		controller = require('../controllers/InfoController');

	router.route('/contacto').
		get( controller.contact ).
		post( controller.sendMail );


	router.route('/sobre-mi').
		get( controller.about );

	router.route('/entrar').
		get( controller.login ).
		post( controller.login_post );
    
	return router;
};