import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signUpDispatcher } from '../dispatchers/signUpDispatcher';
import { clearErrorDispatcher } from '../dispatchers/errorDispatcher';

import '../style/SignUp.css';

const mapStateToProps = state => ({
	error: state.errorReducer.errorMessage,
	userSignedUp: state.signUpReducer.userSignedUp
});

const mapDispatchToProps = dispatch => ({
	signUp: userSignUpData => dispatch(signUpDispatcher(userSignUpData)),
	clearError: () => dispatch(clearErrorDispatcher())
})

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error: ""
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		const userSignUpData = ({
			username: e.target['username'].value,
			email: e.target['email'].value,
			password: e.target['password'].value
		})
		e.preventDefault();
		this.props.signUp(userSignUpData);
	}

	componentDidUpdate() { //component receive new props from sign up action
		if (this.props.userSignedUp) { // If sign up successfully
			alert("Sign up successfully");
			this.props.history.push('/signin'); // direct to sign in page
		} 
		if (this.props.error !== "") { // If sign up fail
			this.setState({
				error: this.props.error
			});
			this.props.clearError();
		}
	}

	render() {
		document.title = 'Sign Up';

		return(
			<>
				<h1>Create an account</h1>
				<p className='errorMessage'>{this.state.error}</p>
				<form onSubmit={this.handleSubmit} id='signup-form'>
					<label>Nickname</label>
					<input type='text' name='username' />
					<label>Email</label>
					<input type='text' name='email' />
					<label>Password</label>
					<input type='password' name='password' />
					<label />
					<input type='submit' value='Sign Up' />
				</form>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);