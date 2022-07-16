/* eslint-disable indent */
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class Standing {
	_id: mongoose.Schema.Types.ObjectId;

	@prop({ required: false })
	createdAt: Date;

	@prop({ required: true})
	position: number;

	@prop({ required: true})
	playedGames: number;

	@prop({ required: true })
	form: string;

	@prop({ required: true })
	won: number;

	@prop({ required: true })
	draw: number;

	@prop({ required: true })
	lost: number;

	@prop({ required: true })
	points: number;

	@prop({ required: true })
	goalsFor: number;

	@prop({ required: true })
	goalsAgainst: number;

	@prop({ required: true })
	group: string;

	@prop({ required: true })
	competitionCode: string;

	@prop({ required: true })
	teamApiID: number;

	@prop({ required: true })
	teamName: string;

	@prop({ required: true })
	teamShortName: string;

	@prop({ required: true })
	teamCode: string;

	@prop({ required: true })
	teamEmblem: string;
	
}

export const StandingModel = getModelForClass(Standing);
