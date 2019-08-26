import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';

import { getFriendListDispatcher } from '../dispatchers/friendDispatcher';

import '../style/ChatRoom.css';

const mapStateToProps = state => ({
	friendList: state.friendReducer.friendList,
	error: state.errorReducer.errorMessage
});
const mapDispatchToProps = dispatch => ({
	getFriendList: () => dispatch(getFriendListDispatcher())
})

class ChatRoom extends Component {

	componentDidMount() {
		this.props.getFriendList();
	}

	friendListRender() {
		return this.props.friendList.map((friend, i) => (
			<tr key={i}>
				<td>
					<CloudinaryContext cloudName='michidelucifer' >
						<Image publicId={friend.imageUrl} className='mini-avatar'>
							 <Transformation width="50" height='50' crop="fill"/>
						</Image>						
					</CloudinaryContext>
				</td>
				<td>{friend.username}</td>
				<td></td>
				<td><Link to={{pathname: '/chat/' + friend.username, state: { friendAvatar: friend.imageUrl } }} >Chat now</Link></td>
			</tr>
		));
	}

	render() {
		document.title = 'Chat Room';
		return (
			<>
				<h1>Chat room</h1>
				<p>{this.props.error}</p>	
				<table id='friend-list'>
					<thead>
						<tr>
							<th>Avatar</th>
							<th>Nickname</th>
							<th>Status</th>
							<th>Chat</th>
						</tr>
					</thead>
					<tbody>
						{this.friendListRender()}
					</tbody>
				</table>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);