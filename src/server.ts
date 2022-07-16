/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

import Sentry from '@sentry/node';
import Tracing from '@sentry/tracing';
import express, { Application } from 'express';
import i18n from 'i18n';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import { connect } from './utils/socket';
import userRoutes from './routes/user';
import competitionRoutes from './routes/competition';
import matchRoutes from './routes/match';


// limit of connection : 5 attempts per 3 min
const connectionLimiter = rateLimit({
	windowMs: 3 * 60 * 1000,
	max: 5,
	message: {
		message: 'ERROR_REQUESTS_LIMIT',
	},
});

export const app: Application = express();

// configure Sentry reporting
if (process.env.NODE_ENV === 'production') {
	app.use(function middleware(req, res, next) {
		Sentry.init({
			dsn: '', // TODO : get Triple id on Sentry
			integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
			tracesSampleRate: 1.0,
			serverName: 'Bet app API',
		});
		next();
	});

	app.use(
		Sentry.Handlers.requestHandler({
			serverName: true,
			user: ['email'],
		})
	);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// declare server access rules
app.use(function middleware(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

	if (req.method === 'OPTIONS') {
		res.status(200).send();
	} else {
		next();
	}
});

// declare routes
let subpath = '';
if (process.env.SUB_PATH) subpath = process.env.SUB_PATH;

app.use(`${subpath}/api/v1/user`, userRoutes);
app.use(`${subpath}/api/v1/competition`, competitionRoutes);
app.use(`${subpath}/api/v1/match`, matchRoutes);

// start server
const port = process.env.PORT || 3000;
const server = app.listen(port);

console.log(`Server now listening on ${port}`);
connect(server);

i18n.configure({
	locales: ['fr', 'en'],
	directory: './src/assets/locales',
	register: global,
});

let lang = process.env.LANG != null ? process.env.LANG : 'fr';
if (lang.length > 2) lang = lang.substring(0, 2);
i18n.setLocale(lang);

const MONGODB_CONNECTION: string = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/betapp';

mongoose.connect(
	MONGODB_CONNECTION,
	{
		autoIndex: false
		/* globaluseNewUrlParser: true,
		useCreateIndex: true,
		bufferMaxEntries: 0,
		useUnifiedTopology: true,
		useFindAndModify: false, */
	},
	(err) => {
		if (err) {
			console.error('Error connecting to MongoDB', err);
		}
	}
);

mongoose.connection.once('open', () => {
	console.log('Server connected to MongoDB');
});

app.use(function middleware(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
	next(err);
});

// managed Sentry errors
if (process.env.NODE_ENV === 'production') {
	app.use(
		Sentry.Handlers.errorHandler({
			shouldHandleError(error) {
				if (error.status === null || error.status === 500) {
					error.status = 500;
					return true;
				}
				return false;
			},
		})
	);

	app.use(function onError(err: any, req: express.Request, res: express.Response) {
		const { status } = err;
		res.status(status).end(err.message);
	});
}

export const rootUrl = `http://localhost:${port}/api/v1`;
