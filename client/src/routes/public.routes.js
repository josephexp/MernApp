import { lazy } from 'react';

// eslint-disable-next-line no-unused-vars
const Login = lazy((_) => import('../pages/login'));
// const Signup = lazy(_ => import('../pages/signup/signup'));

export default [
	{
		exact: true,
		name: 'Login',
		path: '/',
		component: Login,
	},
	{
		exact: true,
		name: 'Login',
		path: '/login',
		component: Login,
	},
	// {
	// 	exact: true,
	// 	name: 'Signup',
	// 	path: '/signup',
	// 	component: Signup,
	// },
	// {
	// 	exact: true,
	// 	name: 'ForgotPassword',
	// 	path: '/ForgotPassword',
	// 	component: ForgotPassword,
	// },
	// {
	// 	exact: true,
	// 	name: 'ChangePassword',
	// 	path: '/ChangePassword',
	// 	component: ChangePassword,
	// },
];
