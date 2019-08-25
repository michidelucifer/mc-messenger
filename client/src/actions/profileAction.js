import { RECEIVE_PROFILE, PASSWORD_CHANGED } from '../constants/actionType';

export const receiveProfile = data => ({
	type: RECEIVE_PROFILE,
	data
})

export const passwordChanged = () => ({
	type: PASSWORD_CHANGED
})

