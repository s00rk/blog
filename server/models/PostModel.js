var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema;

var Post = new Schema({
	title: String,
	body: String,
	views: Number,
	date: { type: Date, default: Date.now },
	slug: String,
	category: String,
	author: 
});