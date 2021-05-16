const { User } = require('../models/User');

const signupUser = async (body) => {
	let user = new User({
		email: body.email,
		password: body.password,
	});
	// user.set({
	// 	username: body.email,
	// 	password: body.password,
	// });
	user = await user.save();
	return user;
};

module.exports = {
	signupUser,
};
