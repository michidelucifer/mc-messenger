import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signInDispatcher } from '../dispatchers/sessionDispatcher';
import { clearErrorDispatcher } from '../dispatchers/errorDispatcher';

import '../style/SignIn.css';

const mapStateToProps = state => ({
	error: state.errorReducer.errorMessage,
	isLoggedIn: Boolean(state.sessionReducer.username)
});
const mapDispatchToProps = dispatch => ({
	signIn: userSignInData => dispatch(signInDispatcher(userSignInData)),
	clearError: () => dispatch(clearErrorDispatcher())
})

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error: ""
		}	

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		const userSignInData = {
			username: e.target['username'].value,
			password: e.target['password'].value
		}
		e.preventDefault();
		this.props.signIn(userSignInData);
	}

	componentDidUpdate() {
		if (this.props.isLoggedIn) {
			this.props.history.push('/profile');
		} 
		if (this.props.error !== "") { // check condition to prevent infinite loop
			this.setState({
				error: this.props.error
			});
			this.props.clearError();
		}
	}


	render() {
		document.title = 'Sign In';
		return(
			<>
				<h1>mcMessenger Sign In</h1>
				<p className='errorMessage'>{this.state.error}</p>
				<form onSubmit={this.handleSubmit} id='signin-form'>
					<label>Nickname</label>
					<input type='text' name='username' />
					<label>Password</label>
					<input type='password' name='password' />
					<label/>
					<input type='submit' value='Sign In' />
				</form>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);