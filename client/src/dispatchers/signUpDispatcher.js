import axios from 'axios';
import { userSignedUp } from '../actions/signUpAction'
import { receiveError } from '../actions/errorAction';

export const signUpDispatcher = userSignUpData => dispatch => {
	axios.post('/api/signUp', userSignUpData, { withCredentials: true})
		.then(response => {
			dispatch(userSignedUp());
		})
		.catch(error => {
			console.log(error.response.data);
			dispatch(receiveError(error.response.data));
		})
}