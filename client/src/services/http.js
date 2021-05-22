import Axios from 'axios';
import { StorageKey } from '../helpers/constants';
import { getCache, setCache } from './storage';
import HandleError from './errorHandler';

const API_URL = 'http://localhost:8081';
const ACCESS_TOKEN_URL = 'accounts/refresh-token';

const axiosConfig = {
	// baseURL: envConfig.API_ENDPOINT || API_URL,
	baseURL: process.env.REACT_APP_API_URL || API_URL,

	headers: {
		'Content-Type': 'application/json',
	},
};

const getToken = (key) => {
	// const tmsUser = getCache(StorageKey.TMS_USER);
	// let token = null;
	// if (tmsUser && tmsUser.data.data[key]) {
	// 	token = tmsUser.data.data[key];
	// }
	// return token;
};

function getApiConfig({ headers = {}, appConfig = {} }) {
	const mainConfig = {
		...axiosConfig,
		headers: {
			...axiosConfig.headers,
			...headers,
			Authorization: `Bearer ${getToken('token')}`,
		},
	};

	if (appConfig.baseURL === '') mainConfig.baseURL = appConfig.baseURL;
	if (appConfig.doNotNeedAuthorizationHeader)
		delete mainConfig.headers.Authorization;

	return mainConfig;
}

const ApiCall = (ajaxParams) => Axios(ajaxParams);

// export function delay(time, value) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve.bind(null, value), time);
//   });
// }

export const GET = ({ url = '', params = {}, headers = {} }) => {
	if (!url) throw new Error('Please specify a API URL');

	const config = getApiConfig({ headers });

	const ajaxParams = {
		...config,
		url,
		params,
		method: 'GET',
	};

	return ApiCall(ajaxParams);
};

export const POST = ({
	url = '',
	params = {},
	data = {},
	headers = {},
	appConfig = {},
}) => {
	if (!url) throw new Error('Please specify a API URL');

	const config = getApiConfig({ headers, appConfig });

	const ajaxParams = {
		...config,
		url,
		data,
		params,
		method: 'POST',
	};

	return ApiCall(ajaxParams);
};

export const PATCH = ({
	url = '',
	params = {},
	data = {},
	headers = {},
	appConfig = {},
}) => {
	if (!url) throw new Error('Please specify a API URL');

	const config = getApiConfig({ headers, appConfig });

	const ajaxParams = {
		...config,
		url,
		data,
		params,
		method: 'PATCH',
	};

	return ApiCall(ajaxParams);
};

export const FILE_POST = ({
	url = '',
	params = {},
	data = {},
	headers = {},
	appConfig = {},
	onUploadProgress = null,
}) => {
	if (!url) throw new Error('Please specify a API URL');

	const config = getApiConfig({ headers, appConfig });

	const ajaxParams = {
		...config,
		url,
		data,
		params,
		method: 'POST',
		onUploadProgress,
	};

	return Axios(ajaxParams);
};

export const PUT = ({ url = '', params = {}, data = {}, headers = {} }) => {
	if (!url) throw new Error('Please specify a API URL');

	const config = getApiConfig({ headers });

	const ajaxParams = {
		...config,
		url,
		data,
		params,
		method: 'PUT',
	};

	return ApiCall(ajaxParams);
};

export const DELETE = ({ url = '', params = {}, data = {}, headers = {} }) => {
	if (!url) throw new Error('Please specify a API URL');

	const config = getApiConfig({ headers });

	const ajaxParams = {
		...config,
		url,
		params,
		data,
		method: 'DELETE',
	};

	return ApiCall(ajaxParams);
};
