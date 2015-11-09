var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema,
	Post 		= require('./PostModel');

var TagModel = new Schema({
	name: { type: String, unique: true, required: true },
	slug: { type: String },
	posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

TagModel.pre('save', function(next) {
	var tag = this;

	if (!tag.isModified('name')) return next();

	tag.slug = tag.name.toLowerCase()
		.replace(/[^\w ]+/g,'')
		.replace(/ +/g,'-');

	next();
});

module.exports = mongoose.model('Tag', TagModel);