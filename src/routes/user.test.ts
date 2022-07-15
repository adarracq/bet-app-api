import request from 'supertest';
import { app } from '../server';
import { updateUserHandler } from '../handlers/user';
import updateUserSchema from '../schemas/user/update.json';
import { validatePayload } from '../middlewares/json-schema';

const schemaValidatorSpy = jest.fn(() => true);

jest.mock('../middlewares/json-schema', () => jest.fn(() => schemaValidatorSpy));

jest.mock('../middlewares/token', () => ({
	withToken: jest.fn((_req, _res, next) => {
		next();
	}),
}));

describe('[POST] /api/v1/user', () => {
	it('...should reject when called with empty payload', async () => {
		const payload = {};
		const res = await request(app).post('/api/v1/user').send(payload).set('authorization', 'anything');
		expect(res.statusCode).toEqual(400);
		expect(validatePayload).toHaveBeenCalledWith(updateUserSchema);
		expect(schemaValidatorSpy).toHaveBeenCalledWith(payload);
		expect(updateUserHandler).not.toHaveBeenCalled();
	});

	it('...should reject when called with a bad payload', async () => {
		const payload = { body: { userId: '' } };
		const res = await request(app).post('/api/v1/user').send(payload).set('authorization', 'anything');
		expect(res.statusCode).toEqual(400);
		expect(validatePayload).toHaveBeenCalledWith(updateUserSchema);
		expect(schemaValidatorSpy).toHaveBeenCalledWith(payload);
		expect(updateUserHandler).not.toHaveBeenCalled();
	});

	it('...should answer when called with good payload', async () => {
		const payload = { body: { userId: 'userId' } };
		const res = await request(app).post('/api/v1/user').send(payload).set('authorization', 'anything');
		expect(validatePayload).toHaveBeenCalledWith(updateUserSchema);
		expect(schemaValidatorSpy).toHaveBeenCalledWith(payload);
		expect(updateUserHandler).toHaveBeenCalled();
		expect(res.statusCode).toEqual(200);
	});
});
