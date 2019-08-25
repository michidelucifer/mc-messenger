import axios from 'axios';
import { receiveSession, clearSession } from '../actions/sessionAction'
import { receiveError } from '../actions/errorAction';
import { updateStore, clearStore } from '../util/sessionStore';

export const signInDispatcher = userSignInData => dispatch => {
	axios.post('/api/session', userSignInData, { withCredentials: true})
		.then(response => {
			updateStore(response.data);
			dispatch(receiveSession(response.data));
		})
		.catch(error => {
			console.log(error);
			dispatch(receiveError(error.response.data));
		})
}

export const signOutDispatcher = () => dispatch => {
	axios.delete('/api/session', { withCredentials: true})
		.then(response => {
			clearStore();
			dispatch(clearSession());
		})
		.catch(error => {
			dispatch(receiveError(error.response.data));
		})
}