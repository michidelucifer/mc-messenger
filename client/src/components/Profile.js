import React, { Component } from 'react';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import { connect } from 'react-redux';

import { getProfileDispatcher, editUsernameDispatcher, editPasswordDispatcher, changeAvatarDispatcher } from '../dispatchers/profileDispatcher';
import { clearErrorDispatcher } from '../dispatchers/errorDispatcher';

import '../style/Profile.css';

const mapStateToProps = state => ({
	username: state.sessionReducer.username,
	imageUrl: state.sessionReducer.imageUrl,
	email: state.profileReducer.email,
	passwordChanged: state.profileReducer.passwordChanged,
	error: state.errorReducer.errorMessage
});
const mapDispatchToProps = dispatch => ({
	getProfile: () => dispatch(getProfileDispatcher()),
	editUsername: newUsername => dispatch(editUsernameDispatcher(newUsername)),
	editPassword: newPassword => dispatch(editPasswordDispatcher(newPassword)),
	changeAvatar: data => dispatch(changeAvatarDispatcher(data)),
	clearError: () => dispatch(clearErrorDispatcher())
})

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// username: this.props.username,
			email: "",
			error: " "
		}

		this.handleEditUsername = this.handleEditUsername.bind(this);
		this.handleEditPassword = this.handleEditPassword.bind(this);
		this.handleEditAvatar = this.handleEditAvatar.bind(this);
	}

	componentDidMount() {
		this.props.getProfile();
	}

	handleEditUsername(e) {
		const newUsername = e.target['username'].value;
		e.preventDefault();
		if (newUsername === this.props.username) {
			this.setState({
				error: "New nickname is the same as the old one"
			})
		} else {
			this.props.editUsername(newUsername);
		}
	}

	handleEditPassword(e) {
		const newPassword = e.target['password'].value;
		const confirmPassword = e.target['confirmPassword'].value;
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			this.setState({
				error: "Passwords not matched"
			})
		} else {
			this.props.editPassword(newPassword);
		}
	}

	handleEditAvatar(e) {
		if (/^image/.test(e.target.files[0].type)) { //check valid image type
			this.setState({
				error: " "
			})
			const data = new FormData();
			data.append('file', e.target.files[0]);
			data.append('name', this.props.username);
			data.append('description', 'avatar of ' + this.props.username);
			this.props.changeAvatar(data);
		} else {
			this.setState({
				error: "Invalid image"
			})
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.username !== this.props.username) {
			alert("Nickname changed!");
			this.setState({
				error: " "
			})
		}
		if (this.props.error !== "") {
			this.setState({
				error: this.props.error
			});
			this.props.clearError();
		}
		if (this.state.email !== this.props.email) {
			this.setState({
				email: this.props.email
			})
		}
		if (this.props.passwordChanged) {
			alert("Password changed!");
			window.location.reload();
		}
		if (this.props.imageUrl !== prevProps.imageUrl) {
			alert("Avatar changed!")
		}
	}

	render() {
		return (
			<>
				<h1>{this.props.username}'s Profile</h1>
				<pre className='errorMessage'>{this.state.error}</pre>

				<div id='profile-wrapper'>
					
					<div id='profile-left'>
						<form id='avatar-form'>
							<CloudinaryContext cloudName='michidelucifer' >
								<Image publicId={this.props.imageUrl} id='avatar'>
									 <Transformation width="200" height='200' crop="fill"/>
								</Image>						
							</CloudinaryContext>
							<label htmlFor='avatar-upload' id='custom-avatar-upload'>Change</label>
							<input id='avatar-upload' type='file' onChange={this.handleEditAvatar} />
						</form>
					</div>
					
					<div id='profile-right'>

						<form id='username-form' className='edit-form' onSubmit={this.handleEditUsername}>
							<label>Nickname</label>
							<input type='text' defaultValue={this.props.username} name='username'/>
							<input type='submit' value='Edit' />
						</form>
						
						<form className='edit-form'>
							<label>Email</label>
							<input defaultValue={this.state.email} disabled />
						</form>
						
						<form id='password-form' className='edit-form' onSubmit={this.handleEditPassword} >
							<label>Change password</label>
							<input type='password' name='password' />
							<input type='submit' value='Change' />
							<label>Confirm password</label>
							<input type='password' name='confirmPassword' />
						</form>
					
					</div>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);