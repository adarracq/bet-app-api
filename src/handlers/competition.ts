/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
var axios = require('axios');
import i18n from 'i18n';
import { CompetitionModel } from 'model/competition';
import { createCompetition, getCompetition, updateCompetition, updateCompetitionbyCode, getAllCompetitions } from '../logic/competition';

export const ERROR_COMPETITION_NOT_FOUND_ERROR = 'COMPETITION_NOT_FOUND_ERROR';
export const ERROR_COMPETITION_NOT_CREATED_ERROR = 'COMPETITION_NOT_CREATED_ERROR';

export const createCompetitionHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const competitionId = await createCompetition(req.body);
		if (competitionId) {
			const result = await getCompetition('' + competitionId); 
			if (result) {
				res.json({
					competition: result
				}) 
			}else {
				next({ message: i18n.__(ERROR_COMPETITION_NOT_FOUND_ERROR), status: 400 });
			}
		} else {
			next({ message: i18n.__(ERROR_COMPETITION_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error);
	}
}

export const createAllCompetitionsHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		
		var config = {
			headers: {
				'X-Auth-Token': 'd44e56fc964a40e7a3f2d9ffaefce6f8'
			}	
		}

		axios.get(
			'https://api.football-data.org/v4/competitions', 
			config
		)
		.then(
			async function(response: { data: any; status: any; statusText: any; headers: any; config: any; }) {
				if(response.status == 200) {
					var compets = response.data.competitions
					for(var i = 0; i < compets.length ; i++) {
						var compet = {
							name : compets[i].name,
							code : compets[i].code,
							type : compets[i].type,
							emblem : compets[i].emblem,
							dateStart: compets[i].currentSeason.startDate,
							dateEnd: compets[i].currentSeason.endDate,
							currentMatchDay: compets[i].currentSeason.currentMatchday || 0
						}
						await createCompetition(compet);
					}
					res.json({
						competition: compets
					}) 
				}
				else {
					next({ message: i18n.__(ERROR_COMPETITION_NOT_CREATED_ERROR), status: 400 });
				}
		});
		
	} catch (error) {
		console.log(error);
		next(error);
	}
}

export const getCompetitionHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const competition = await getCompetition(req.params.competitionId)
		if (competition) {
			res.json({
				competition: competition
			})
		} else {
			next({ message: i18n.__(ERROR_COMPETITION_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error)
	}
}

export const getAllCompetitionsHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const competitions = await getAllCompetitions()
		if (competitions) {
			res.json({
				competitions: competitions
			})
		} else {
			next({ message: i18n.__(ERROR_COMPETITION_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error)
	}
}

export const updateCompetitionHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const competition = await updateCompetition(req.competitionId, req.body);
		if (competition) {
			res.json({
				competitionId: competition._id,
			});
		} else {
			next({ message: i18n.__(ERROR_COMPETITION_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error);
	}
};


export const updateAllCompetitionsHandler = async (req: any, res: Response, next: NextFunction) => {
	try {

		var config = {
			headers: {
				'X-Auth-Token': 'd44e56fc964a40e7a3f2d9ffaefce6f8'
			}	
		}

		axios.get(
			'https://api.football-data.org/v4/competitions', 
			config
		)
		.then(
			async function(response: { data: any; status: any; statusText: any; headers: any; config: any; }) {
				if(response.status == 200) {
					var compets = response.data.competitions
					for(var i = 0; i < compets.length ; i++) {
						var compet = {
							name : compets[i].name || 'undefined',
							code : compets[i].code || 'undefined',
							type : compets[i].type || 'undefined',
							emblem : compets[i].emblem || 'undefined',
							dateStart: compets[i].currentSeason.startDate || 'undefined',
							dateEnd: compets[i].currentSeason.endDate || 'undefined',
							currentMatchDay: compets[i].currentSeason.currentMatchday || 0
						}
						await updateCompetitionbyCode(compet.code, compet);
					}
					res.json({
						competition: compets
					}) 
				}
				else {
					next({ message: i18n.__(ERROR_COMPETITION_NOT_CREATED_ERROR), status: 400 });
				}
		});

	} catch (error) {
		next(error);
	}
};