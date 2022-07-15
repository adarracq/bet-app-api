/* eslint-disable indent */
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class User {
	_id: mongoose.Schema.Types.ObjectId;

	@prop({ required: false })
	createdAt: Date;

	@prop({ required: true, unique: true, sparse: true })
	pseudo: string;

	@prop({ required: true })
	avatar: string;

	@prop({ required : false })
	contests: mongoose.Schema.Types.ObjectId[] = [];

	
}

export const UserModel = getModelForClass(User);
