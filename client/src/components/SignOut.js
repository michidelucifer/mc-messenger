import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signOutDispatcher } from '../dispatchers/sessionDispatcher';
import { clearErrorDispatcher } from '../dispatchers/errorDispatcher';

const mapStateToProps = state => ({
	errorMessage: state.errorReducer.errorMessage,
	isLoggedIn: Boolean(state.sessionReducer.username)
})
const mapDispatchToProps = dispatch => ({
	signOut: () => dispatch(signOutDispatcher()),
	clearError: () => dispatch(clearErrorDispatcher())
});

class SignOut extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errorMessage: ""
		}
	}

	componentDidMount() {
		this.props.signOut();
	}

	componentDidUpdate() {
		if (!this.props.isLoggedIn) {
			alert("Your have been signed out!")
			this.props.history.push('/signIn');
		} 
		if (this.props.errorMessage !== "") { // check condition to prevent infinite loop
			this.setState({
				errorMessage: this.props.errorMessage
			});
			this.props.clearError();
		}
	}

	render() {
		document.title = 'Sign Out';
		return(
			<p className='errorMessage'>{this.state.errorMessage}</p>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);