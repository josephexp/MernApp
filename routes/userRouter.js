const express = require('express');
const { validateSchema } = require('../middlewares/validationMiddleware');

const router = express.Router();

const userController = require('../controllers/userController');
const userValidation = require('../validations/userValidation');

const catchErrors = require('../utils/catchErrors');

router.post(
	'/signup',
	validateSchema(userValidation.signup),
	catchErrors(userController.signup)
);

module.exports = router;
