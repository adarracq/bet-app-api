/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Mongoose } from 'mongoose';
import { Match, MatchModel } from '../model/match';
import { emit } from '../utils/socket';

export const createMatch = async (data : any): Promise<mongoose.Schema.Types.ObjectId | null> => {
	const match = await MatchModel.create(data);
	if (match) {
		await match.save();
		emit('createMatch', match);
		return match._id;
	}
	return null;
}

export const getMatch = async (matchId : string): Promise<Match | null> => {
	const match = await MatchModel.findById(matchId)
	await MatchModel
	if (match) {
		emit('getMatch', match);
		return match;
	}
	return null;
}

export const getMatchsFromCompetition = async (competitionCode : string): Promise<Match[] | null> => {
	const matchs = await MatchModel.find({competitionCode : competitionCode})
	if (matchs) {
		emit('getMatchsFromCompetition', matchs);
		return matchs;
	}
	return null;
}

export const getMatchsByMatchDay = async (competitionCode : string, matchDay: number): Promise<Match[] | null> => {
	const matchs = await MatchModel.find({competitionCode : competitionCode, matchDay : matchDay})
	if (matchs) {
		emit('getMatchsFromCompetition', matchs);
		return matchs;
	}
	return null;
}


export const updateMatch = async (apiID: string, data: any): Promise<Match | null> => {
	const match = await MatchModel.findOne({apiID : apiID});
	if (match) {
		Object.keys(data).forEach((key) => ((match as any)[key] = data[key]));
		await match.save();

		emit('updateMatch', match);
		return match;
	}
	return null;
};


export default updateMatch;
