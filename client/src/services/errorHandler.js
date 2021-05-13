import ToastMessage from './toaster';
import XMLParser from 'react-xml-parser';

const HandleError = error => {
	// const dispatch = useDispatch();
	const getFileSize = size => {
		if (size === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		const i = Math.floor(Math.log(size) / Math.log(k));
		return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};
	if (!error || !error.status) return;

	switch (error.status) {
		case 500:
			ToastMessage('tms-error', 'error', error.data ? error.data.message : 'Internal server error');
			window.location.href = '/';
			break;
		case 422:
			ToastMessage('tms-error', 'error', error.data ? error.data.error[0].message : error);
			break;
		case 400:
			if (error?.data?.message) {
				ToastMessage('tms-error', 'error', error?.data?.message);
			} else {
				if (error?.data) {
					let jsonData = new XMLParser().parseFromString(error.data);
					const errorMessage = `${jsonData.children[1].value} (${getFileSize(
						jsonData.children[3].value
					)})`;
					if (errorMessage) {
						ToastMessage('tms-error', 'error', errorMessage);
					}
				}
			}
			break;
		case 409:
			ToastMessage('tms-error', 'error', error.data ? error.data.message : error);
			break;
		default:
			break;
	}
};

export default HandleError;
