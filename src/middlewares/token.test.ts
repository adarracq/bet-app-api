/* eslint-disable indent */
import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../model/user';
import { noop } from '../utils/noop';
import { emit } from '../utils/socket';
import { DEFAULT_SECRET, USER_NOT_FOUND, withToken } from './token';

const next = jest.fn();

const userSpy = {
	save: jest.fn(),
};

jest.mock('../model/user', () => ({
	UserModel: {
		findById: jest.fn((_userId: string) => {
			switch (_userId) {
				case 'userId':
					return userSpy;
				case 'userIdNotFound':
					return null;
				default:
					return {};
			}
		}),
	},
}));

jest.mock('jsonwebtoken', () => ({
	verify: jest.fn((_bearerToken: string) => {
		const decoded: { sub: string } = {
			sub: '',
		};
		switch (_bearerToken) {
			case 'failing_token':
				throw new Error('Invalid Token');
			case 'null_user_token':
				decoded.sub = 'userIdNotFound';
				break;
			case 'valid_token':
				decoded.sub = 'userId';
				break;
			default:
				return {};
		}
		return decoded;
	}),
}));

jest.mock('../utils/socket', () => ({
	emit: jest.fn(noop),
}));

beforeEach(() => {
	next.mockReset();
});

describe('withToken(req, res, next) middleware', () => {
	it('...should call next(USER_NOT_FOUND) if req.headers.authorization is undefined', async () => {
		const req = {};
		await withToken(req, {} as express.Response, next);
		expect(next).toHaveBeenCalledWith(USER_NOT_FOUND);
	});

	it('...should call next(USER_NOT_FOUND) if req.headers.authorization cause an error for jwt.verify', async () => {
		const token = 'failing_token';
		const authorization = `Bearer ${token}`;
		const headers = { authorization };
		const req = { headers };
		await withToken(req, {} as express.Response, next);
		expect(jwt.verify).toHaveBeenCalledWith(token, DEFAULT_SECRET);
		expect(next).toHaveBeenCalledWith(USER_NOT_FOUND);
	});

	it('...should call next(USER_NOT_FOUND) if user is null', async () => {
		const token = 'null_user_token';
		const authorization = `Bearer ${token}`;
		const headers = { authorization };
		const req = { headers };
		await withToken(req, {} as express.Response, next);
		expect(jwt.verify).toHaveBeenCalledWith(token, DEFAULT_SECRET);
		expect(UserModel.findById).toHaveBeenCalledWith('userIdNotFound');
		expect(next).toHaveBeenCalledWith(USER_NOT_FOUND);
	});

	it('...should call next() if user is not null', async () => {
		const token = 'valid_token';
		const authorization = `Bearer ${token}`;
		const headers = { authorization };
		const req = { headers };
		await withToken(req, {} as express.Response, next);
		expect(jwt.verify).toHaveBeenCalledWith(token, DEFAULT_SECRET);
		expect(UserModel.findById).toHaveBeenCalledWith('userId');
		expect(next).toHaveBeenCalled();
		expect(userSpy.save).toHaveBeenCalled();
		expect(emit).toHaveBeenCalled();
	});
});
