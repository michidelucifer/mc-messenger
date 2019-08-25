import { combineReducers } from 'redux';

import signUpReducer from './signUpReducer';
import sessionReducer from './sessionReducer';
import profileReducer from './profileReducer';
import errorReducer from './errorReducer';

export default combineReducers({
	signUpReducer,
	sessionReducer,
	profileReducer,
	errorReducer
})