const { UNPROCESSABLE_ENTITY, BAD_REQUEST } = require('http-status');

const errorFormatter = (req, errorList) =>
	errorList.map((error) => ({
		message: 'error',
		key: error.context.key,
	}));
const validateSchema = (schema) => async (req, res, next) => {
	try {
		const payload = {
			...req.body,
			...req.query,
			...req.params,
		};
		delete payload.lng;
		const result = await schema.validateAsync(payload, {
			abortEarly: false,
			escapeHtml: true,
			allowUnknown: true,
			stripUnknown: true,
			errors: {
				wrap: {
					label: false,
				},
			},
		});
		if (result.error) {
			const response = errorFormatter(req, result.error.details);
			return res.status(UNPROCESSABLE_ENTITY).send({
				code: UNPROCESSABLE_ENTITY,
				message: 'ERROR.VALIDATION_ERROR',
				error: response,
			});
		}
		return next();
	} catch (error) {
		return res.status(BAD_REQUEST).send({
			code: BAD_REQUEST,
			message: error,
		});
	}
};
module.exports = {
	validateSchema,
};
