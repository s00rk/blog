var Post 	= require('../models/PostModel'),
	moment 	= require('moment');

module.exports =
{

	findAllPosts: function(req, res)
	{
		var max_page = 1;
		var skip = 0;
		var limit = 8;
		var page = 1;
		var p_page = 1;
		var n_page = 1;
		Post.count(function(err, count){

			if(limit < count)
			{
				max_page = Math.ceil( parseInt(count)/parseInt(limit) ) + 1;
			}

			if(req.params.page)
			{
				page = req.params.page;
				skip = (parseInt(page)-1) * limit;				
			}

			p_page = parseInt(page) - 1;
			if(p_page < 1)
			{
				p_page = 1;
			}

			n_page = parseInt(page) + 1;
			if(n_page >= max_page)
			{
				n_page = page;
			}
		
			Post.find().populate('author').sort('-createdAt').skip(skip).limit(limit).exec(function(err, posts){
				moment.locale('es');
				var flash = req.flash('info');
				if( flash.length != 0 )
				{
					flash = JSON.parse( flash );
				}
				if(!err) res.render('inicio', { 'posts': posts, 'moment': moment, 'flash': flash, 'max_page': max_page, 'page': page, 'p_page': p_page, 'n_page': n_page });
				else console.log('ERROR: ' + err);
			});

		});
	},

	findPost: function(req, res)
	{
		Post.findOne({ slug: req.params.slug }, function(err, post){
			if(!err) {
				post.views = parseInt(post.views) + 1;
				post.save();
				res.render('articulo', { 'post': post });
			}
			else console.log('ERROR: ' + err);
		});
	},

};