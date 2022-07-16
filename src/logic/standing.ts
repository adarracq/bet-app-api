/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Mongoose } from 'mongoose';
import { Standing, StandingModel } from '../model/standing';
import { emit } from '../utils/socket';


export const createStanding = async (data : any): Promise<mongoose.Schema.Types.ObjectId | null> => {
	const standing = await StandingModel.create(data);
	if (standing) {
		await standing.save();
		emit('createStanding', standing);
		return standing._id;
	}
	return null;
}


export const getStanding = async (standingId : string): Promise<Standing | null> => {
	const standing = await StandingModel.findById(standingId)

	if (standing) {
		await standing.save();
		emit('getStanding', standing);
		return standing;
	}
	return null;
}

export const getStandingsFromCompetition = async (competitionCode : string): Promise<Standing[] | null> => {
	const standings = await StandingModel.find({competitionCode : competitionCode})
	if (standings) {
		emit('getStandingsFromCompetition', standings);
		return standings;
	}
	return null;
}


export const updateStanding = async (apiID: string, data: any): Promise<Standing | null> => {
	const standing = await StandingModel.findOne({apiID : apiID});
	if (standing) {
		Object.keys(data).forEach((key) => ((standing as any)[key] = data[key]));
		await standing.save();

		emit('updateStanding', standing);
		return standing;
	}
	return null;
};


export default updateStanding;
