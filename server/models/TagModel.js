var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema;

var TagModel = new Schema({
	name: { type: String, unique: true, required: true },
	posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('Tag', TagModel);