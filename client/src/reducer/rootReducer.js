import { combineReducers } from 'redux';

import signUpReducer from './signUpReducer';
import sessionReducer from './sessionReducer';
import profileReducer from './profileReducer';
import friendReducer from './friendReducer';
import messageReducer from './messageReducer';
import errorReducer from './errorReducer';

export default combineReducers({
	signUpReducer,
	sessionReducer,
	profileReducer,
	friendReducer,
	messageReducer,
	errorReducer
})