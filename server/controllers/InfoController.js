var app = require('../main.js');
module.exports =
{

	about: function(req, res){
		res.render('about');
	},

	contact: function(req, res){
		res.render('contacto');
	},

	sendMail: function(req, res){
		app.mailer.send('email', {
			to: 'victor.riverac92@gmail.com',
			subject: 'Contacto [ ' + req.body.email + ' ]'
		}, function (err) {
			req.flash('info', '{"title":" ", "message":"Mensaje Enviado!"}');
		res.redirect('/');
		});
	}

};