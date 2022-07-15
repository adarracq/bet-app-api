/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../model/user';
import { emit } from '../utils/socket';

export const DEFAULT_SECRET = 'triple_encoding_key';
export const USER_NOT_FOUND = { message: 'Logout', status: 401 };

/**
 * Check if authorization token is a valid one
 */
export const withToken = async (req: any, res: express.Response, next: express.NextFunction) => {
	const bearerHeader = req.headers?.authorization;
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const [, bearerToken] = bearer;
		try {
			const decoded: any = jwt.verify(bearerToken, process.env.JWT_SECRET || DEFAULT_SECRET);
			req.userId = decoded.sub;

			const user = await UserModel.findById(req.userId);

			if (user) {
				next();

				const date = new Date();
				user.lastActivity = date;

				await user.save();

				emit('updateUserLastActivity', {
					userId: req.userId,
					lastActivity: date,
				});
			} else {
				next(USER_NOT_FOUND);
			}
		} catch (err) {
			next(USER_NOT_FOUND);
		}
	} else {
		next(USER_NOT_FOUND);
	}
};

export default withToken;
