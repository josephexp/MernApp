import React, { memo } from 'react';

import './spinner.css';

export const Loader = _ => (
	<div className="spinner">
		<div className="bounce1" />
		<div className="bounce2" />
		<div className="bounce3" />
	</div>
);

export const Spinner = _ => (
	<div className="spinner-container">
		<Loader />
	</div>
);

export const SpinnerCenter = _ => (
	<div className="spinner-center">
		<Loader />
	</div>
);

export default memo(Spinner);
