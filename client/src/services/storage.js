const BASE_PATH = 'tms - ';

const setCache = (key, value) => {
	if (key !== undefined) {
		try {
			localStorage.removeItem(BASE_PATH + key);
			localStorage.setItem(
				BASE_PATH + key,
				btoa(unescape(encodeURIComponent(JSON.stringify(value))))
			);
		} catch (e) {
			return false;
		}
		return true;
	}
	return false;
};

const getCache = (key, value) => {
	const returnValue = value || false;
	if (key !== 'undefined') {
		try {
			if (localStorage.getItem(BASE_PATH + key) != null) {
				return JSON.parse(
					decodeURIComponent(escape(window.atob(localStorage.getItem(BASE_PATH + key))))
				);
			}
		} catch (e) {
			return returnValue;
		}
	}
	return returnValue;
};

const remCache = key => {
	if (key !== 'undefined') {
		try {
			localStorage.removeItem(BASE_PATH + key);
		} catch (e) {
			return false;
		}
		return true;
	}
	return false;
};

export { getCache, setCache, remCache };
