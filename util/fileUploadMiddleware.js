const axios = require('axios');
const cloudinary = require('cloudinary');
const parseError = require('../util/parseError');

function fileUploadMiddleware(req, res) {
	// console.log(req.headers.origin + req.baseUrl);
	cloudinary.uploader.upload_stream(result => {
		const imageUrl = result.public_id + '.' + result.format;
		axios({
			url: req.headers.origin + req.baseUrl + '/changeAvatar',
			method: 'put',
			data: {
				imageUrl: imageUrl,
				userId: req.session.user.userId
			}
		}).then(response => {
			res.status(200).send({ imageUrl });
		}).catch(error => {
			res.status(500).send(parseError(error));
		})
	}).end(req.file.buffer);
}

module.exports = fileUploadMiddleware;