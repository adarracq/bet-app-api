/* eslint-disable indent */
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class Competition {
	_id: mongoose.Schema.Types.ObjectId;

	@prop({ required: false })
	createdAt: Date;

	@prop({ required: true})
	name: string;

	@prop({ required: true })
	code: string;

	@prop({ required: true })
	type: string;

	@prop({ required: true })
	emblem: string;

	@prop({ required: true })
	dateStart: Date;

	@prop({ required: true })
	dateEnd: Date;

	@prop({ required: true })
	currentMatchDay: number;

	@prop({ required : false })
	scorersIDs: mongoose.Schema.Types.ObjectId[] = [];

	
}

export const CompetitionModel = getModelForClass(Competition);
