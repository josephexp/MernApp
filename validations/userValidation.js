const Joi = require('joi');
const { User } = require('../models/User');

const signup = Joi.object()
	.keys({
		email: Joi.string().trim().required().messages({
			'string.base': 'ERROR.VALUE_STRING_TYPE_ERROR',
			'string.empty': 'ERROR.EMPTY_VALUE',
			'any.required': 'ERROR.EMAIL_REQUIRED',
		}),
		password: Joi.string().trim().required().messages({
			'string.base': 'ERROR.VALUE_STRING_TYPE_ERROR',
			'string.empty': 'ERROR.EMPTY_VALUE',
			'any.required': 'ERROR.PASSWORD_REQUIRED',
		}),
	})
	.external(async (object) => {
		const emailUserCount = await User.countDocuments({
			email: object.email,
		});
		if (emailUserCount) {
			throw new Error('ERROR.EMAIL_UNIQUE_ERROR');
		}

		return object;
	});

module.exports = {
	signup,
};
