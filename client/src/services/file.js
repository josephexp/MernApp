import { POST, PUT, GET, FILE_POST } from './http';

export const getFileKey = async (file = {}, processURL = '', contentType, uid = '', fileSize) => {
	const extension = file.name.split('.');
	const awsConfig = {
		url: processURL,
		data: {
			uid,
			filename: file.name,
			extension: extension[extension.length - 1],
			contentType,
			size: fileSize,
		},
	};
	const { data = {} } = await POST(awsConfig);
	return data;
};

export const setFileKey = async (key = '', processURL = '') => {
	const reqParam = {
		url: processURL,
		data: { profileImage: key },
	};

	const response = await PUT(reqParam);
	return response;
};

export const fileUpload = async (
	file = {},
	data = null,
	onUploadProgress = null,
	imageInfo = null
) => {
	const { fields } = data.data.url;
	const formData = new FormData();

	Object.keys(fields).forEach(key => {
		formData.append(key, fields[key]);
	});

	// Upload Image to the AWS
	formData.append('file', file, imageInfo ? imageInfo?.name : file?.name);
	return FILE_POST({
		url: data.data.url.url,
		data: formData,
		appConfig: { baseURL: '', doNotNeedAuthorizationHeader: true },
		headers: { 'Content-Type': 'Multipart/form-data', 'Access-Control-Allow-Origin': '*' },
		onUploadProgress,
	});
};

export const getBlobImageData = async url => {
	if (!url) return null;
	const blob = await fetch(url).then(r => r.blob());
	return URL.createObjectURL(blob);
};

export const fileDownload = async (imageKey = '', processURL = '', isPathOnly = false) => {
	if (!imageKey || !imageKey.length) return null;

	const req = {
		url: processURL,
		headers: { key: imageKey },
	};

	const imageResponse = await GET(req);
	if (isPathOnly) {
		return imageResponse.data.path;
	}
	return getBlobImageData(imageResponse.data.path);
};
