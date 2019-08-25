const User = require('../models/user');
const { signUpValidate } = require('../validations/accountValidation');
const parseError = require('../util/parseError');

const signUpRouter = require('express').Router();

signUpRouter.post('', async (req, res) => {
	try {
		const { username, email, password } = req.body;
		signUpValidate(username, email, password);
		const newUser = new User({ username, email, password});
		await newUser.save();
		res.status(200).send();
	} catch(error) {
		console.log(error.message);
		res.status(400).send(parseError(error));
	}
})

module.exports = signUpRouter;