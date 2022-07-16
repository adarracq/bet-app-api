/* eslint-disable indent */
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class Match {
	_id: mongoose.Schema.Types.ObjectId;

	@prop({ required: false })
	createdAt: Date;

	@prop({ required: true})
	apiID: number;

	@prop({ required: true})
	date: Date;

	@prop({ required: true })
	status: string;

	@prop({ required: true })
	matchDay: number;

	@prop({ required: true })
	stage: string;

	@prop({ required: true })
	fullTimeHomeScore: number;

	@prop({ required: true })
	fullTimeAwayScore: number;

	@prop({ required: true })
	halfTimeHomeScore: number;

	@prop({ required: true })
	halfTimeAwayScore: number;

	@prop({ required: true })
	result: string;

	@prop({ required: true })
	competitionCode: string;

	@prop({ required: true })
	awayTeamApiID: number;

	@prop({ required: true })
	awayTeamName: string;

	@prop({ required: true })
	awayTeamShortName: string;

	@prop({ required: true })
	awayTeamCode: string;

	@prop({ required: true })
	awayTeamEmblem: string;

	@prop({ required: true })
	homeTeamApiID: number;

	@prop({ required: true })
	homeTeamName: string;

	@prop({ required: true })
	homeTeamShortName: string;

	@prop({ required: true })
	homeTeamCode: string;

	@prop({ required: true })
	homeTeamEmblem: string;

	
}

export const MatchModel = getModelForClass(Match);
