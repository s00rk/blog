var Post 	= require('../models/PostModel'),
	moment 	= require('moment'),
	User 	= require('../models/UserModel'),
	fs 		= require('fs');

module.exports =
{

	index: function(req, res){
		Post.find().populate('author').exec(function(err, posts){
			moment.locale('es');
			var flash = req.flash('info');
			if( flash.length != 0 )
			{
				flash = JSON.parse( flash );
			}
			if(!err) res.render('admin_inicio', { 'posts': posts, 'moment': moment, 'flash': flash, 'csrfToken': req.csrfToken() });
			else console.log('ERROR: ' + err);
		});
	},

	addPostView: function(req, res){
		res.render('admin_addPost', { 'csrfToken': req.csrfToken() });
	},

	addPost: function(req, res){
		var newpost = new Post({
			title: req.body.title,
			body: req.body.body
		});
		newpost.save(function(err){
			if(!err) {
				req.flash('info', '{"message": "Post Agregado"}');
				res.redirect('/admin');
			}
			else res.send('ERROR: ' + err);
		})
	},

	deletePost: function(req, res){
		Post.remove({ slug: req.params.slug }, function(err){
			req.flash('info', '{"message": "Post Eliminado"}');
			res.redirect('/admin/');
		});
	},

	editPost: function(req, res){		
		Post.findOne({ slug: req.params.slug }, function(err, post){
			if(!err) {
				post.title = req.body.title;
				post.body = req.body.body;
				post.publish = ((req.body.publish == 'on') ? true : false);
				post.author = req.session.user;


				if(req.file)
				{
					var ext = req.file.originalname.substr(req.file.originalname.lastIndexOf('.') + 1);
					var newfile = req.file.path.replace( req.file.filename, 'post_' + post.id + '.' + ext );
					fs.unlink( post.image, function (err){
						fs.rename(req.file.path, newfile, function(err){});
					});
					
					post.image = '/static/uploads/post_' + post.id + '.' + ext;
				}

				post.save();


				req.flash('info', '{"message": "Post Modificado"}');
				res.redirect('/admin');
			}
			else console.log('ERROR: ' + err);
		});
	},

	findPost: function(req, res){
		Post.findOne({ slug: req.params.slug }, function(err, post){
			if(!err) res.render('admin_edit', { 'post': post, 'csrfToken': req.csrfToken() });
			else {
				req.flash('info', '{"message": "Post No Existe"}');
				res.redirect('/admin');
			}
		});
	}

};