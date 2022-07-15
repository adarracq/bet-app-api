/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import i18n from 'i18n';
import { UserModel } from 'model/user';
import { createUser, getUser, getUserContests, updateUser } from '../logic/user';

export const ERROR_USER_NOT_FOUND_ERROR = 'USER_NOT_FOUND_ERROR';

export const createUserHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const userId = await createUser(req.body);
		if (userId) {
			const result = await getUser('' + userId); 
			if (result) {
				res.json({
					user: result
				}) 
			}else {
				next({ message: i18n.__(ERROR_USER_NOT_FOUND_ERROR), status: 400 });
			}
		} else {
			next({ message: i18n.__(ERROR_USER_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error);
	}
}

export const getUserHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const user = await getUser(req.params.userId)
		if (user) {
			res.json({
				user: user
			})
		} else {
			next({ message: i18n.__(ERROR_USER_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error)
	}
}

export const getUserContestsHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const contests = await getUserContests(req.params.userId);
		if (contests) {
			res.json({
				contests: contests
			})
		} else {
			next({ message: i18n.__(ERROR_USER_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error)
	}
}

export const updateUserHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const user = await updateUser(req.userId, req.body);
		if (user) {
			res.json({
				userId: user._id,
			});
		} else {
			next({ message: i18n.__(ERROR_USER_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error);
	}
};
