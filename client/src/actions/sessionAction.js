import { RECEIVE_SESSION, CLEAR_SESSION, USERNAME_CHANGED, AVATAR_CHANGED } from '../constants/actionType';

export const receiveSession = (data) => ({
	type: RECEIVE_SESSION,
	data
})

export const clearSession = () => ({
	type: CLEAR_SESSION
})

export const usernameChanged = data => ({
	type: USERNAME_CHANGED,
	data
})

export const avatarChanged = data => ({
	type: AVATAR_CHANGED,
	data
})