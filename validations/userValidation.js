const Joi = require('joi');

const signup = Joi.object().keys({
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
});

module.exports = {
	signup,
};
