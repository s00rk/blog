var Post = require('../models/PostModel');

module.exports =
{

	findAllPosts: function(req, res){
		Post.find(function(err, posts){
			if(!err) res.render('inicio', { 'posts': posts });
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
			body: req.body.body,


		});
	}

};