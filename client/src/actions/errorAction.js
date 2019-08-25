import { RECEIVE_ERROR, CLEAR_ERROR } from '../constants/actionType';

export const receiveError = (data) => ({
	type: RECEIVE_ERROR,
	data
})

export const clearError = () => ({
	type: CLEAR_ERROR
})