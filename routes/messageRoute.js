const User = require('../models/user');
const Message = require('../models/message');
const parseError = require('../util/parseError');

const messageRoute = require('express').Router();

messageRoute.get('', (req, res) => {
	console.log(req.query);
	try {
		User.findById(req.session.user.userId, 'messages', (err, user) => {
			const contact = user.messages.find(contact => contact.friend === req.query.friendName);
			if (contact) {
				Message.findOne({ _id: contact.conversationId }, 'conversation', (err, message) => {
					console.log(message.conversation);
					res.status(200).send({ conversation: message.conversation });
				})
			} else {
				console.log('no contact found')
				res.status(200).send({ conversation: [] });
			}
		})
	} catch (error) {
		res.status(400).send(parseError(error));
	}
})

module.exports = messageRoute;