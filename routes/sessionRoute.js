const compareSync = require('bcryptjs').compareSync;
const sessionRouter = require('express').Router();

const User = require('../models/user');
const signInValidate = require('../validations/accountValidation');
const parseError = require('../util/parseError');

// Sign in router
sessionRouter.post('', async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (Boolean(user) && compareSync(password, user.password)) {
			req.session.user = ({
				userId: user.id,
				username
			})
			res.status(200).send({ username, imageUrl: user.imageUrl });
		}
		else {
			throw new Error('Incorrect Username or Password');
		} 
	} catch (error) {
			console.log(error.message);
			res.status(401).send(parseError(error));
	}
});

// Sign out router
sessionRouter.delete('', (req, res) => {
	try {
		if (Boolean(req.session.user)) {
			req.session.destroy(error => {
				if(error) throw error;
				res.clearCookie(process.env.SESSION_NAME);
				res.status(200).send();
			})
		} else throw new Error('Session not found');
	} catch (error) {
		console.log(error);
		res.status(400).send(parseError(error));
	}
})

module.exports = sessionRouter;