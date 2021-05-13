import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import { useSelector } from 'react-redux';
// import { ToastContainer } from 'react-toastify';
import PrivateRoutes from './routes/private.routes';
// import AppSpinner from './components/spinner';
import publicRoutes from './routes/public.routes';
// import PageNotFound from './pages/pagenotfound/pageNotFound';
// import AppLayout from './components/appLayout/appLayout';
// import 'react-toastify/dist/ReactToastify.css';
import AppSpinner from './components/spinner';

const AppRoutes = () => (
	<>
		{/* <ToastContainer /> */}
		<Router>
			<Switch>
				{publicRoutes.map(({ component: Component, ...rest }, index) => (
					<PublicRoute key={index} component={Component} {...rest} />
				))}
				{/* {PrivateRoutes.map((route, index) => (
					<PrivateRoute key={index} {...route} />
				))} */}
			</Switch>
		</Router>
	</>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
	// <AppLayout isLoggedIn>
	<Suspense fallback={<AppSpinner />}>
		<Route {...rest} component={Component} />
	</Suspense>
	// </AppLayout>
);
const PublicRoute = ({ component: Component, ...rest }) => (
	<Route {...rest}>
		<Suspense fallback={<AppSpinner />}>
			<Component />
		</Suspense>
	</Route>
);
export default AppRoutes;
