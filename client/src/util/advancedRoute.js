import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const mapStateToProps = state => ({
	isLoggedIn: Boolean(state.sessionReducer.username)
})

const Auth = ({ isLoggedIn, path, component: Component }) => (
	<Route 
		path={path}
		render={props => {
			if (isLoggedIn) {
				return <Component {...props} />;
			} else {
				alert("You must sign in first");
				return <Redirect to='/signIn' />;
			}
		}}
	/>
);

const Protected = ({ isLoggedIn, path, component: Component }) => (
	<Route
		path={path}
		render={props => {
			return isLoggedIn ? <Redirect to='/' /> : <Component {...props} />
		}}
	/>
);

export const AuthRoute = connect(mapStateToProps)(Auth);
export const ProtectedRoute = connect(mapStateToProps)(Protected);