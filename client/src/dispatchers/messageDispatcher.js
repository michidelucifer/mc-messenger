import axios from 'axios';

import { receiveConversation } from '../actions/messageAction';
import { receiveError } from '../actions/errorAction';

export const getHistoryConversationDispatcher = friendName => dispatch => {
	axios.get('/api/message', { friendName }, { withCredentials: true })
		.then(response => {
			dispatch(receiveConversation(response.data));
		})
		.catch (error => {
			dispatch(receiveError(error.response.data));
		})
}