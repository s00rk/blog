var Post 	= require('../models/PostModel'),
	moment 	= require('moment');

module.exports =
{

	findAllPosts: function(req, res){
		Post.find(function(err, posts){
			moment.locale('es');
			if(!err) res.render('inicio', { 'posts': posts, 'moment': moment });
			else console.log('ERROR: ' + err);
		});
	},

	findPost: function(req, res){
		Post.find({ slug: req.params.slug }, function(err, post){
			if(!err) res.send(post);
			else console.log('ERROR: ' + err);
		});
	},

	addPost: function(req, res){
		var newpost = new Post({
			title: req.body.title,
			body: req.body.body
		});
		newpost.save(function(err){
			if(!err) res.send('Post Publicado');
			else res.send('ERROR: ' + err);
		})
	},

};