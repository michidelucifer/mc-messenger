import { RECEIVE_FRIEND_LIST } from '../constants/actionType';

const initialState = { friendList: [] }
export default function friendReducer (state = initialState, { type, data }) {
	switch (type) {
		case RECEIVE_FRIEND_LIST:
			return ({ ...state, friendList: data.friendList });
		default:
			return state;
	}
}