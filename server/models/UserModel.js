var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema,
	Post 		= require('./PostModel');

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
//$2a$10$fuJFTUs2S0SHVDxriGglbONhp6BaXHO4pUEb58.NOzZ.r3AVTxOzu
UserModel.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

UserModel.virtual('fullName').get(function(){
	return this.firstName + ' ' + this.lastName;
});

UserModel.set('toJSON', {
	virtuals: true
});
UserModel.set('toObject', {
	virtuals: true
});

module.exports = mongoose.model('User', UserModel);