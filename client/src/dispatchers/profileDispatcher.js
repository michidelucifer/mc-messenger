import axios from 'axios';

import { receiveProfile, passwordChanged } from '../actions/profileAction';
import { usernameChanged, avatarChanged } from '../actions/sessionAction';
import { receiveError } from '../actions/errorAction';
import { updateStore } from '../util/sessionStore';

export const getProfileDispatcher = () => dispatch => {
	axios.get('/api/profile', { withCredentials: true })
		.then(response => {
			dispatch(receiveProfile(response.data));
		})
		.catch(error => {
			dispatch(receiveError(error.response.data));
		})
}

export const editUsernameDispatcher = newUsername => dispatch => {
	axios.put('/api/profile/editUsername', ({ newUsername }), { withCredentials: true })
		.then(response => {
			// console.log(response.status)
			updateStore({ username: newUsername });
			dispatch(usernameChanged({ username: newUsername }));
		})
		.catch(error => {
			dispatch(receiveError(error.response.data));
		}) 
}

export const editPasswordDispatcher = newPassword => dispatch => {
	axios.put('/api/profile/editPassword', ({ newPassword }), { withCredentials: true })
		.then(response => {
			// console.log(response.status)
			dispatch(passwordChanged());
		})
		.catch(error => {
			dispatch(receiveError(error.response.data));
		}) 
}

export const changeAvatarDispatcher = data => dispatch => {
	axios.post('/api/profile/uploadAvatar', data, { withCredentials: true })
		.then(response => {
			updateStore(response.data);
			dispatch(avatarChanged(response.data));
		})
		.catch(error => {
			dispatch(receiveError(error.response.data));
		}) 
}

