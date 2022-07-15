/* eslint-disable @typescript-eslint/no-explicit-any */
import Ajv from 'ajv';
import express from 'express';

const ajv = new Ajv();

export const validatePayload = (schema: any) => async (req: any, res: any, next: express.NextFunction) => {
	const validate = ajv.compile(schema);
	console.log(req.body)
	if (validate(req.body)) {
		console.log("Schema validate")
		next();
	} else {
		console.log("wrong schema")
		next({ message: 'BAD_PAYLOAD', status: 400 });
	}
};

export default validatePayload;
