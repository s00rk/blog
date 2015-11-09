var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema;

var bcrypt		= require('bcrypt');

var UserModel = new Schema({
	firstName: String,
	lastName: String,
	username: { type: String, required: true, unique: true},
	twitter: { type: String, unique: true},
	email: { type: String, required: true, unique: true},
	password: { type: String, required: true },
	photo: String,
	createdAt: { type: Date, default: Date.now },
	posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

UserModel.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});

});

UserModel.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserModel);