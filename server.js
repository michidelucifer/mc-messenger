const express = require('express');
const http = require('http');
const session = require('express-session');
const mongoose = require('mongoose');
const connectStore = require('connect-mongo');
const cors = require('cors');
const path = require('path');
const cloudinary = require('cloudinary');

const { signUpRouter, sessionRouter, profileRouter } = require('./routes/routes');

require('dotenv').config();

(async() => {
	try {
		await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

		const app = express();
		const httpServer = http.createServer(app);
		const MongoStore = connectStore(session);

		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.CLOUD_API_KEY,
			api_secret: process.env.CLOUD_API_SECRET
		})

		app.disable('x-powered-by');
		app.use(express.static(path.join(__dirname, 'client/build')));
		app.use(cors({
			credentials: true,
			origin: 'http://localhost:3000'
		}));
		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());

		const isProduction = process.env.NODE_ENV === 'production';
		if (isProduction) {
			app.set('trust proxy', 1);
		}

		app.use(session({
			name: process.env.SES_NAME,
			secret: process.env.SES_SECRET,
			saveUninitialized: true,
			resave: false,
			store: new MongoStore({
				mongooseConnection: mongoose.connection,
				collection: 'mcmsSession',
				ttl: parseInt(process.env.SES_TIME)
			}),
			httpOnly: true,
			samesite: true,
			secure: isProduction,
			maxAge: parseInt(process.env.SES_TIME) * 1000
		}));

		const apiRouter = express.Router();
		app.use('/api', apiRouter);
		apiRouter.use('/signUp', signUpRouter); 
		apiRouter.use('/session', sessionRouter); 
		apiRouter.use('/profile', profileRouter);

		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname + '/client/build/index.html'));
		});

		const port = process.env.PORT || 5000;

		httpServer.listen(port);

		console.log('mcMessenger is listening on port ' + port); 
	} catch (error) {
		console.log(error);
	}
})();