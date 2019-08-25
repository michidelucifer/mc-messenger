const USERNAME = 'username';
const IMAGEURL = 'IMAGEURL';

export const setPreLoadedState = () => ({
	sessionReducer: {
		username: window.sessionStorage.getItem(USERNAME),
		imageUrl: window.sessionStorage.getItem(IMAGEURL)
	}
})

export const updateStore = data => {
	if (data.username) window.sessionStorage.setItem(USERNAME, data.username);
	if (data.imageUrl) window.sessionStorage.setItem(IMAGEURL, data.imageUrl);
}

export const clearStore = data => {
	window.sessionStorage.removeItem(USERNAME);
	window.sessionStorage.removeItem(IMAGEURL);
}