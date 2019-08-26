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
		console.log(io.onlineUsers);
		let conversation = [];
		socket.on('send message', data => {
			const { from, to, message } = data;
			conversation.push(data);
			const toUser = io.onlineUsers.find(user => user.username === to);
				if (toUser) { // toUser is online
					const toSocketId = toUser.socketId;
					io.to(toSocketId).emit('send message', data)
				}
			})
		socket.on('disconnect', () => {
			console.log('user disconnected')
				saveMessage(conversation);
				conversation = [];
				io.onlineUsers = io.onlineUsers.filter(user => user.socketId !== socket.id)
				console.log(io.onlineUsers)
			})
	})
}

const saveMessage = async (newConversations) => {
	try {
		if (newConversations.length === 0) return;
		let extractedConversation = newConversations.map(data => ({ username: data.from, message: data.message }));
		const { from, to } = newConversations[0];
		const fromUser = await User.findOne({ username: from }, 'messages');
		let conversation = await fromUser.messages.find(ele => ele.friend === to);
		if (!conversation) {
			const newMessage = new Message ({
				conversation: extractedConversation
			});
			await newMessage.save();
			fromUser.messages.push({
				friend: to,
				conversationId: newMessage._id
			})
			await fromUser.save();
			const toUser = await User.findOne({ username: to }, 'messages');
			toUser.messages.push({
				friend: from,
				conversationId: newMessage._id
			})
			await toUser.save();
		}
		else {
			const currentConversation = await Message.findOne({ _id: conversation.conversationId }, 'conversation');
			currentConversation.conversation.push(...extractedConversation);
			await currentConversation.save();
		}
	} catch (error) {
		console.log(parseError(error));
	}
}

module.exports = chatHandle;