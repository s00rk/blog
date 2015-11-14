var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema,
	User		= require('./UserModel'),
	Tag 		= require('./TagModel');

var PostModel = new Schema({
	title: { type: String, required: true, unique: true },
	body: { type: String, required: true },
	image: { type: String, default: '/static/images/contact.png' },
	views: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now },
	slug: String,
	tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	publish: { type: Boolean, required: true, default: true }
});


PostModel.pre('save', function(next) {
	var post = this;

	if (!post.isModified('title')){
		next();
		return;	
	} 

	post.slug = post.title.toLowerCase()
		.replace(/[^\w ]+/g,'')
		.replace(/ +/g,'-');

	next();
});

PostModel.set('toJSON', {
	virtuals: true
});
PostModel.set('toObject', {
	virtuals: true
});

module.exports = mongoose.model('Post', PostModel);