const { UNAUTHORIZED, BAD_REQUEST } = require('http-status');
const ApplicationError = require('../utils/ApplicationError');
const { User } = require('../models/User');

const signupUser = async (body) => {
	let user = new User({
		email: body.email,
		password: body.password,
	});
	user = await user.save();
	return user;
};
const loginUser = async (body) => {
	let user = await User.findOne({ email: body.email, password: body.password });
	if (!user) {
		throw new ApplicationError(UNAUTHORIZED, 'AUTH.INVALID_CREDENTIALS');
		// return { status: 401, message: 'Invalid Credentials' };
	}
	user = user.toJSON();
	return { user, status: 200 };
};

module.exports = {
	signupUser,
	loginUser,
};
