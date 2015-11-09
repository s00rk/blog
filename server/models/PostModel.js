var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema;

var PostModel = new Schema({
	title: String,
	body: String,
	views: Number,
	createdAt: { type: Date, default: Date.now },
	slug: String,
	category: String,
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Post', PostModel);