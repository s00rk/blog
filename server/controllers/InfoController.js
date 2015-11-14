var app 	= require('../main.js');
var User 	= require('../models/UserModel');
var bcrypt		= require('bcrypt');
module.exports =
{

	about: function(req, res){
		res.render('about');
	},

	contact: function(req, res){
		res.render('contacto', { 'csrfToken': req.csrfToken() });
	},

	sendMail: function(req, res){
		app.mailer.send('email', {
			to: 'victor.riverac92@gmail.com',
			subject: 'Contacto [ ' + req.body.email + ' ]'
		}, function (err) {
			req.flash('info', '{"title":" ", "message":"Mensaje Enviado!"}');
			res.redirect('/');
		});
	},

	login: function(req, res){
		if(req.session.logged)
		{
			res.redirect('/');
			return;
		}

		var flash = req.flash('info');
		if( flash.length != 0 )
		{
			flash = JSON.parse( flash );
		}
		res.render('login', { 'flash': flash, 'csrfToken': req.csrfToken() });
	},

	login_post: function(req, res){
		User.findOne({ username: req.body.username }, function(err, user){
			if(err)
			{
				req.flash('info', '{"message": "'+err+'"}');
				res.render('login');
				return;
			}else if(user == null){
				req.flash('info', '{"message":"El Usuario No Existe!"}');
				res.redirect('/entrar');
				return;
			}

			bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
				if(err)
				{
					req.flash('info', '"message": "'+err+'"}');
					res.redirect('/entrar');
				}else if(isMatch){
					req.session.user = user;
					req.session.logged = true;
					req.session.save();
					res.redirect('/');
				}else{
					req.flash('info', '{"message":"Contraseña Incorrecta!"}');
					res.redirect('/entrar');
				}
			});
		});
	}

};