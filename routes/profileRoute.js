const multer = require('multer');
const profileRouter = require('express').Router();

const User = require('../models/user');
const parseError = require('../util/parseError');
const usernameValidate = require('../validations/accountValidation').usernameValidate;
const passwordValidate = require('../validations/accountValidation').passwordValidate;
const fileUploadMiddleware = require('../util/fileUploadMiddleware');

profileRouter.get('', async (req, res) => {
	// console.log(req.headers.origin + req.baseUrl);
	try {
		const user = await User.findById(req.session.user.userId, 'email');
		res.status(200).send({ email: user.email })
	} catch (error) {
		res.status(400).send(parseError(error));
	}
})

profileRouter.put('/editUsername', async (req, res) => {
	// console.log(req.session.user);
	// console.log(req.body.newUsername);
	try {
		const newUsername = req.body.newUsername;
		usernameValidate(newUsername);
		let count = await User.countDocuments({ username: newUsername });
		if (count !== 0) throw new Error("Username has already existed");
		await User.findById(req.session.user.userId, 'username', (err, user) => {
			user.username = newUsername;
			user.save();
		});
		req.session.user.username = newUsername;
		res.status(200).send();
	} catch (error) {
		// console.log(error);
		res.status(400).send(parseError(error));
	}
})

profileRouter.put('/editPassword', async (req, res) => {
	try {
		const newPassword = req.body.newPassword;
		passwordValidate(newPassword);
		await User.findById(req.session.user.userId, 'password', (err, user) => {
			user.password = newPassword;
			user.save();
		});
		res.status(200).send();
	} catch (error) {
		res.status(400).send(parseError(error));
	}
})

const storage = multer.memoryStorage();
const upload = multer({ storage });

profileRouter.post('/uploadAvatar', upload.single('file'), fileUploadMiddleware);
profileRouter.put('/changeAvatar', async (req, res) => {
	try {
		await User.findById(req.body.userId, 'imageUrl', (error, user) => {
			user.imageUrl = req.body.imageUrl;
			user.save();
		});
		res.end();
	} catch (error) {
		res.status(400).send(parseError(error));
	}
})

module.exports = profileRouter;