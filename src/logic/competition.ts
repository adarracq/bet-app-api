/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Mongoose } from 'mongoose';
import { Competition, CompetitionModel } from '../model/competition';
import { emit } from '../utils/socket';

export const createCompetition = async (data : any): Promise<mongoose.Schema.Types.ObjectId | null> => {
	const competition = await CompetitionModel.create(data);
	if (competition) {
		await competition.save();
		emit('createCompetition', competition);
		return competition._id;
	}
	return null;
}

export const getCompetition = async (competitionId : string): Promise<Competition | null> => {
	const competition = await CompetitionModel.findById(competitionId)
	await CompetitionModel
	if (competition) {
		emit('getCompetition', competition);
		return competition;
	}
	return null;
}

export const getAllCompetitions = async (): Promise<Competition[] | null> => {
	const competitions = await CompetitionModel.find()
	if (competitions) {
		emit('getAllCompetitions', competitions);
		return competitions;
	}
	return null;
}


export const updateCompetition = async (competitionId: string, data: any): Promise<Competition | null> => {
	const competition = await CompetitionModel.findById(competitionId);
	if (competition) {
		Object.keys(data).forEach((key) => ((competition as any)[key] = data[key]));
		await competition.save();

		emit('updateCompetition', competition);
		return competition;
	}
	return null;
};

export const updateCompetitionbyCode = async (competitionCode: string, data: any): Promise<Competition | null> => {
	const competition = await CompetitionModel.findOne({code : competitionCode});
	if (competition) {
		Object.keys(data).forEach((key) => ((competition as any)[key] = data[key]));
		await competition.save();

		emit('updateCompetition', competition);
		return competition;
	}
	return null;
};

export default updateCompetition;
