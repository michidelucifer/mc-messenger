import axios from 'axios';

import { receiveFriendList } from '../actions/friendAction';
import { receiveError } from '../actions/errorAction';

export const getFriendListDispatcher = () => dispatch => {
	axios.get('/api/friend', { withCredentials: true })
		.then(response => {
			// console.log('get list ok')
			return dispatch(receiveFriendList(response.data));
		})
		.catch(error => {
			return dispatch(receiveError(error.response.data));
		})
}