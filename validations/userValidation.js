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

const login = Joi.object().keys({
	email: Joi.string().required().email().trim().messages({
		'string.base': 'ERROR.VALUE_STRING_TYPE_ERROR',
		'string.empty': 'ERROR.EMPTY_VALUE',
		'string.email': 'ERROR.INVALID_EMAIL',
		'any.required': 'ERROR.EMAIL_REQUIRED',
	}),
	password: Joi.string().required().messages({
		'string.base': 'ERROR.VALUE_STRING_TYPE_ERROR',
		'string.empty': 'ERROR.EMPTY_VALUE',
		'any.required': 'ERROR.PASSWORD_REQUIRED',
	}),
});

module.exports = {
	signup,
	login,
};
