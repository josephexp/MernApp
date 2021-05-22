const { signupUser, loginUser } = require('../services/userService');

const signup = async (req, res) => {
	const { body } = req;
	const user = await signupUser(body);
	res.status(200).send(user);
};
const login = async (req, res) => {
	const { body } = req;
	const user = await loginUser(body);
	// res.status(200).send(user);

	res.status(user.status).send(user);
};
module.exports = {
	signup,
	login,
};
