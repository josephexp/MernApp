import { toast } from 'react-toastify';

export const ToastStatus = {
	SUCCESS: 'success',
	ERROR: 'error',
	INFO: 'info',
	WARNING: 'warning',
};

const ToastMessage = (msgId = '', msgStatus = '', message = '', isAutoClose = 4000) => {
	const toastConfig = {
		autoClose: 4000,
		pauseOnHover: false,
		hideProgressBar: true,
		position: toast.POSITION.TOP_RIGHT,
		closeButton: false,
		pauseOnFocusLoss: false,
	};
	if (toast.isActive(msgId)) {
		return;
	}
	toastConfig.autoClose = isAutoClose;

	switch (msgStatus) {
		case ToastStatus.ERROR:
			toast.error(message, toastConfig);
			break;
		case ToastStatus.SUCCESS:
			toast.success(message, toastConfig);
			break;
		case ToastStatus.INFO:
			toast.info(message, toastConfig);
			break;

		default:
			break;
	}
};

export default ToastMessage;
