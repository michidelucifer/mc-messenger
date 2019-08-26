const friendRouter = require('express').Router();

const User = require('../models/user');
const parseError = require('../util/parseError');

friendRouter.get('', (req, res) => {
	try {
		User.find({}, 'username imageUrl', (err, users) => {
			if(users) {
				const friendList = users.filter(user => user.username !== req.session.user.username).map(user => ({ username: user.username, imageUrl: user.imageUrl }));
				res.status(200).send({ friendList });
			} else {
				res.status(200).send({ friendList: [] })
			}
		})
	} catch (error) {
		res.status(400).send(parseError(error));
	}
})

module.exports = friendRouter;