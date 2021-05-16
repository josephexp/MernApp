const { signupUser } = require('../services/userService');

const signup = async (req, res) => {
	const { body } = req;
	const user = await signupUser(body);
	res.status(200).send(user);
};
module.exports = {
	signup,
};
