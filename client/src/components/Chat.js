import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
// import io from 'socket.io-client';

import { getHistoryConversationDispatcher } from '../dispatchers/messageDispatcher';

import '../style/Chat.css';

const mapStateToProps = state => ({
	username: state.sessionReducer.username,
	imageUrl: state.sessionReducer.imageUrl,
	conversation: state.messageReducer.conversation
});
const mapDispatchToProps = dispatch => ({
	getHistoryConversation: friendName => dispatch(getHistoryConversationDispatcher(friendName))
})

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			historyButtonDisplay: true,
			message: "",
			friendName: this.props.match.params.friendName,
			friendAvatar: this.props.location.state.friendAvatar,
			// socket: io.connect(window.location.origin + '?username=' + this.props.username, { secure: true }),
			conversation: []
		}

		this.messageChange = this.messageChange.bind(this);
		this.enterPressed = this.enterPressed.bind(this);
		this.handleSendMessage = this.handleSendMessage.bind(this);

		/*this.state.socket.on('send message', data => {
			if (data.from === this.state.friend) {
				let newConversation = this.state.conversation.slice();
				newConversation.push({
					username: data.from,
					message: data.message
				});
				this.setState({
					conversation: newConversation
				})
			}
		})*/
	}

	renderViewHistoryButton() {
		if (this.state.historyButtonDisplay) return <button id='view-history-button' onClick={this.renderHistory}>View history</button>;
		return null;
	}

	renderHistory() {
		this.props.getHistoryConversation(this.state.friend);
		this.setState({
			historyButtonDisplay: false
		})
	}

	messageChange(e) {
		this.setState({
			message: e.target.value
		})
	}

	handleSendMessage(e) {
		e.preventDefault();
		if(this.state.message.trim() !== "") {
			/*this.state.socket.emit('send message', {
				from: this.props.username,
				to: this.props.friendName,
				message: this.state.message
			});*/
			let newConversation = this.state.conversation.slice();
			newConversation.push({ 
				username: this.props.username,
				message: this.state.message 
			});
			this.setState({
				conversation: newConversation,
				message: ""
			})
		}
	}

	enterPressed(e) {
		const code = e.keyCode || e.which;
		if(code === 13) this.handleSendMessage(e)
	}

	renderConversation() {
		return this.state.conversation.map(data => (
			<p><span className={data.username === this.props.username ? 'home' : 'away'}>{data.username}: </span>{data.message}</p>
		))
	}

	componentDidUpdate(prevProps) {
		if (this.props.conversation && prevProps.conversation.length !== this.props.conversation.length) {
			this.setState({
				conversation: this.props.conversation,
			})
		}
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	render() {
		document.title = this.props.match.params.friendName;

		return(
			<>
				<h1>{this.props.match.params.friendName}</h1>
				<p>{this.props.error}</p>
				
				<div id='conversation-wrapper'>
					
					<div id='friend'>
						<div id='conversation'>
							{this.renderViewHistoryButton()}
							{this.renderConversation()}
							<div ref={(el) => { this.messagesEnd = el; }} />
						</div>
						<div id='friend-avatar'>
							<CloudinaryContext cloudName='michidelucifer' >
								<Image publicId={this.state.friendAvatar}>
							 		<Transformation width="250" height='250' crop="fill"/>
								</Image>						
							</CloudinaryContext>
						</div>
					</div>

					<div id='user'>
						<div id='user-typer'>
							<form id='typer' onSubmit={this.handleSendMessage} >
								<textarea value={this.state.message} onKeyPress={this.enterPressed} onChange={this.messageChange} />
								<input type='submit' value='Send' />
							</form>
						</div>
						<div id='user-avatar'>
							<CloudinaryContext cloudName='michidelucifer' >
								<Image publicId={this.props.imageUrl} >
							 		<Transformation width="75" height='75' crop="fill"/>
								</Image>						
							</CloudinaryContext>
						</div>
					</div>

				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);