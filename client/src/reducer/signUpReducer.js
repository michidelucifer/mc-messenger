import { USER_SIGNED_UP } from '../constants/actionType';

const initialState = ({ userSignedUp: false });
const signUpReducer = (state = initialState, { type }) => {
	switch (type) {
		case USER_SIGNED_UP:
			return ({ userSignedUp: true });
		default:
			return state;
	}
}

export default signUpReducer;