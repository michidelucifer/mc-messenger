const User = require('../models/user');
const Message = require('../models/message');
const parseError = require('../util/parseError');


function chatHandle (io) {
	io.on('connection', socket => {
		console.log('1 user connected')
		if (io.onlineUsers) {
			io.onlineUsers.push({
				socketId: socket.id,
				username: socket.handshake.query.username
			})
		}
		else {
			io.onlineUsers = [{
				socketId: socket.id,
				username: socket.handshake.query.username
			}]
		}
		socket.on('send message', data => {
			const { from, to, message } = data;
			saveMessage(data);
			const toUser = io.onlineUsers.find(user => user.username === to);
				if (toUser) { // toUser is online
					const toSocketId = toUser.socketId;
					io.to(toSocketId).emit('send message', data)
				}
			})
		socket.on('disconnect', () => {
			console.log('user disconnected')
			io.onlineUsers = io.onlineUsers.filter(user => user.socketId !== socket.id)
			})
	})
}

const saveMessage = async (data) => {
	// console.log('saving conversation...')
	const { from, to, message } = data;
	try {
		const fromUser = await User.findOne({ username: from }, 'messages');
		let conversation = fromUser.messages.find(ele => ele.friend === to);
		if (!conversation) {
			const newMessage = new Message ({
				conversation: [{ username: from, message }]
			});
			// await newMessage.save();
			newMessage.save();
			fromUser.messages.push({
				friend: to,
				conversationId: newMessage._id
			})
			// await fromUser.save();
			fromUser.save();
			const toUser = await User.findOne({ username: to }, 'messages');
			toUser.messages.push({
				friend: from,
				conversationId: newMessage._id
			})
			// await toUser.save();
			toUser.save();
		}
		else {
			const currentConversation = await Message.findOne({ _id: conversation.conversationId }, 'conversation');
			currentConversation.conversation.push({ username: from, message });
			// await currentConversation.save();
			currentConversation.save();
		}
	} catch (error) {
		console.log(parseError(error));
	}
}

module.exports = chatHandle;