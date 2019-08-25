import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import './style/index.css';
import rootReducer from './reducer/rootReducer';
import { setPreLoadedState } from './util/sessionStore';

let preLoadedState = setPreLoadedState();
const store = createStore(rootReducer, preLoadedState, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);