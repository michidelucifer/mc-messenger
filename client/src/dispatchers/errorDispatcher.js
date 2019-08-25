import { receiveError, clearError } from '../actions/errorAction';

export const receiveErrorDispatcher = data => dispatch => {
	dispatch(receiveError(data));
}

export const clearErrorDispatcher = () => dispatch => {
	dispatch(clearError());
}