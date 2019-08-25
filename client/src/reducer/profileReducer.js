import { RECEIVE_PROFILE, PASSWORD_CHANGED } from '../constants/actionType';

const initialState = { email: null, passwordChanged: false }
const profileReducer = (state = initialState, { type, data }) => {
	switch (type) {
		case RECEIVE_PROFILE:
			return ({ ...state, email: data.email });
		case PASSWORD_CHANGED:
			return ({ ...state, passwordChanged: true });
		default:
			return state;
	}
}

export default profileReducer;