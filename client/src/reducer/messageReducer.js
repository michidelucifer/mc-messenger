import { RECEIVE_CONVERSATION } from '../constants/actionType';

const initialState = { conversation: [] }
export default function messageReducer (state = initialState, { type, data }) {
	switch (type) {
		case RECEIVE_CONVERSATION:
			console.log(data.conversation);
			return ({ ...state, conversation: data.conversation });
		default:
			return state;
	}
} 