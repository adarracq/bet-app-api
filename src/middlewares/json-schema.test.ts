import { validatePayload } from './json-schema';

const schema = {
	type: 'object',
	properties: {
		lorem: {
			type: 'string',
			minLength: 1,
		},
	},
	required: ['lorem'],
};

const error = {
	message: 'BAD_PAYLOAD',
	status: 400,
};

describe('validatePayload(schema)(req, res, next) middleware', () => {
	it('...should call next(Error) if payload is empty', async () => {
		const req = {};
		const next = jest.fn(() => ({}));
		await validatePayload(schema)(req, {}, next);
		expect(next).toHaveBeenCalledWith(error);
	});

	it('...should call next(Error) if payload is wrong', async () => {
		const req = { lorem: '' };
		const next = jest.fn(() => ({}));
		await validatePayload(schema)(req, {}, next);
		expect(next).toHaveBeenCalledWith(error);
	});

	it('...should call next() if payload is good', async () => {
		const req = { lorem: 'ipsum' };
		const next = jest.fn(() => ({}));
		await validatePayload(schema)(req, {}, next);
		expect(next).not.toHaveBeenCalledWith(error);
	});
});
