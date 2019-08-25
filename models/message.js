const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({ username: String, message: String }, { _id: false });

const MessageSchema = new Schema({ 
	conversation: [ConversationSchema]
	}, {_id: true});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;