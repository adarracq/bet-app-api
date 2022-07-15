/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Mongoose } from 'mongoose';
import { User, UserModel } from '../model/user';
import { emit } from '../utils/socket';

export const createUser = async (data : any): Promise<mongoose.Schema.Types.ObjectId | null> => {
	const user = await UserModel.create(data);
	if (user) {
		await user.save();
		emit('createUser', user);
		return user._id;
	}
	return null;
}

export const getUser = async (userId : string): Promise<User | null> => {
	const user = await UserModel.findById(userId)
	if (user) {
		emit('getUser', user);
		return user;
	}
	return null;
}

export const getUserContests = async (userId : string): Promise<mongoose.Schema.Types.ObjectId[] | null> => {
	const user = await getUser(userId);
	if (user) {
		emit('getContests('+ user._id +')', user.contests);
		return user.contests;
	}
	return null;
}

export const updateUser = async (userId: string, data: any): Promise<User | null> => {
	const user = await UserModel.findById(userId);
	if (user) {
		Object.keys(data).forEach((key) => ((user as any)[key] = data[key]));
		await user.save();

		emit('updateUser', user);
		return user;
	}
	return null;
};

export default updateUser;
