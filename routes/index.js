const express = require('express');
const userRoute = require('./userRouter');
const router = express.Router();

const defaultRoutes = [
	{
		path: '/user',
		route: userRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
