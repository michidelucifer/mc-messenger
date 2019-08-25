import { RECEIVE_ERROR, CLEAR_ERROR } from '../constants/actionType';

const initialErrorState = ({ errorMessage: "" })
const errorReducer = (state = initialErrorState, { type, data }) => {
	switch (type) {
		case RECEIVE_ERROR:
			return ({ errorMessage: data.errorMessage });
		case CLEAR_ERROR:
			return ({ errorMessage: "" });
		default:
			return state; 
	}
}

export default errorReducer;