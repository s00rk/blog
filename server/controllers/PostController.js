var Post 	= require('../models/PostModel'),
	moment 	= require('moment');

module.exports =
{

	findAllPosts: function(req, res){
		Post.find().populate('author').exec(function(err, posts){
			moment.locale('es');
			var flash = req.flash('info');
			if( flash.length != 0 )
			{
				flash = JSON.parse( flash );
			}
			if(!err) res.render('inicio', { 'posts': posts, 'moment': moment, 'flash': flash });
			else console.log('ERROR: ' + err);
		});
	},

	findPost: function(req, res){
		Post.find({ slug: req.params.slug }, function(err, post){
			if(!err) res.render('articulo', { 'post': post });
			else console.log('ERROR: ' + err);
		});
	},

};