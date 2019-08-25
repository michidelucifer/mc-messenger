const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({ 
	friend: String, 
	conversationId: String
	}, {_id: false});

const UserSchema = new Schema({
	username: {
		type: String,
		validate: {
			validator: username => User.doesNotExist({ username }),
			message: "Username has already existed"
		}
	},
	email: {
		type: String,
		validate: {
			validator: email => User.doesNotExist({ email }),
			message: "Email has already existed"
		}
	},
	password: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		default: 'dcwtw41k0ikibcg8goho.png'
	},
	messages: [ContactSchema]
}, { timestamps: true });

UserSchema.pre('save', function() {
	if (this.isModified('password')) {
		this.password = bcrypt.hashSync(this.password, 12);
	}
});

UserSchema.statics.doesNotExist = async function (field) {
	return await this.where(field).countDocuments() === 0;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;