var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema,
	User		= require('./UserModel'),
	Tag 		= require('./TagModel');

var PostModel = new Schema({
	title: { type: String, required: true, unique: true },
	body: { type: String, required: true },
	views: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now },
	slug: String,
	tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
	author: { type: Schema.Types.ObjectId, ref: 'User' }
});


PostModel.pre('save', function(next) {
	var post = this;

	if (!post.isModified('title')) return next();

	post.slug = post.title.toLowerCase()
		.replace(/[^\w ]+/g,'')
		.replace(/ +/g,'-');

	next();
});

module.exports = mongoose.model('Post', PostModel);