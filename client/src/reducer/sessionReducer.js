import { RECEIVE_SESSION, CLEAR_SESSION, USERNAME_CHANGED, AVATAR_CHANGED } from '../constants/actionType';

const nullSession = { username: null, imageUrl: null };
export default function sessionReducer (state = nullSession, { type, data }) {
	switch (type) {
		case RECEIVE_SESSION:
			return ({ ...state, username: data.username, imageUrl: data.imageUrl });
		case CLEAR_SESSION:
			return nullSession;
		case USERNAME_CHANGED:
			return ({ ...state, username: data.username });
		case AVATAR_CHANGED:
			return ({ ...state, imageUrl: data.imageUrl });
		default:
			return state;
	}
}