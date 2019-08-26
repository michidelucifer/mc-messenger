import { RECEIVE_CONVERSATION } from '../constants/actionType';

export const receiveConversation = data => ({
	type: RECEIVE_CONVERSATION,
	data
})