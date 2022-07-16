/* eslint-disable @typescript-eslint/no-explicit-any */
import { match } from 'assert';
import { NextFunction, Response } from 'express';
var axios = require('axios');
import i18n from 'i18n';
import { createStanding, getStanding, updateStanding, getStandingsFromCompetition } from '../logic/standing';

export const ERROR_STANDING_NOT_FOUND_ERROR = 'STANDING_NOT_FOUND_ERROR';
export const ERROR_STANDING_NOT_CREATED_ERROR = 'STANDING_NOT_CREATED_ERROR';

export const createStandingHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const standingID = await createStanding(req.body);
		if (standingID) {
			const result = await getStanding('' + standingID); 
			if (result) {
				res.json({
					standing: result
				}) 
			}else {
				next({ message: i18n.__(ERROR_STANDING_NOT_FOUND_ERROR), status: 400 });
			}
		} else {
			next({ message: i18n.__(ERROR_STANDING_NOT_CREATED_ERROR), status: 400 });
		}
	} catch (error) {
		next(error);
	}
}

export const createAllStandingsHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		//var codes = ['BSA','ELC','PL','CL','EC','FL1','BL1','SA','DED','PPL','CLI','PD','WC'];
		var codes = ['BSA', 'ELC'];

		var config = {
			headers: {
				'X-Auth-Token': 'd44e56fc964a40e7a3f2d9ffaefce6f8'
			}	
		}
		for(var j = 0; j < codes.length; j++) {
			axios.get(
				'https://api.football-data.org/v4/competitions/' + codes[j] +'/standings', 
				config
			)
			.then(
				async function(response: { data: any; status: any; statusText: any; headers: any; config: any; }) {
					if(response.status == 200) {
						var standings = response.data.standings[0].table
						for(var i = 0; i < standings.length ; i++) {
							console.log(standings[i]);
							var standing = {
								position: standings[i].position,
								playedGames: standings[i].playedGames,
								form: standings[i].form,
								won: standings[i].won,
								draw: standings[i].draw,
								lost: standings[i].lost,
								points: standings[i].points,
								goalsFor: standings[i].goalsFor,
								goalsAgainst: standings[i].goalsAgainst,
								group: response.data.standings[0].group || 'NO',
								teamApiID: standings[i].team.id,
								teamName: standings[i].team.name,
								teamShortName: standings[i].team.shortName,
								teamShortCode: standings[i].team.tla,
								teamEmblem: standings[i].team.crest,
								competitionCode: response.data.competition.code
								

							}
							await createStanding(standing);
						}
					}
					else {
						console.log('errrror');
						next({ message: i18n.__(ERROR_STANDING_NOT_CREATED_ERROR), status: 400 });
					}
			});
		}
		
	} catch (error) {
		console.log(error);
		next(error);
	}
}

export const getStandingHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const standing = await getStanding(req.params.standingId)
		if (standing) {
			res.json({
				standing: standing
			})
		} else {
			next({ message: i18n.__(ERROR_STANDING_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error)
	}
}

export const getStandingsFromCompetitionHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const standings = await getStandingsFromCompetition(req.params.competitionId)
		if (standings) {
			res.json({
				standings: standings
			})
		} else {
			next({ message: i18n.__(ERROR_STANDING_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error)
	}
}


export const updateStandingHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const standing = await updateStanding(req.apiID, req.body);
		if (standing) {
			res.json({
				apiID: standing.apiID,
			});
		} else {
			next({ message: i18n.__(ERROR_STANDING_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error);
	}
};


export const updateAllMatchsHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		//var codes = ['BSA','ELC','PL','CL','EC','FL1','BL1','SA','DED','PPL','CLI','PD','WC'];
		var codes = ['BSA', 'ELC'];

		var config = {
			headers: {
				'X-Auth-Token': 'd44e56fc964a40e7a3f2d9ffaefce6f8'
			}	
		}
		for(var j = 0; j < codes.length; j++) {
			axios.get(
				'https://api.football-data.org/v4/competitions/' + codes[j] +'/standings', 
				config
			)
			.then(
				async function(response: { data: any; status: any; statusText: any; headers: any; config: any; }) {
					if(response.status == 200) {
						var standings = response.data.standings[0].table
						for(var i = 0; i < standings.length ; i++) {
							console.log(standings[i]);
							var standing = {
								position: standings[i].position,
								playedGames: standings[i].playedGames,
								form: standings[i].form,
								won: standings[i].won,
								draw: standings[i].draw,
								lost: standings[i].lost,
								points: standings[i].points,
								goalsFor: standings[i].goalsFor,
								goalsAgainst: standings[i].goalsAgainst,
								group: response.data.standings[0].group || 'NO',
								teamApiID: standings[i].team.id,
								teamName: standings[i].team.name,
								teamShortName: standings[i].team.shortName,
								teamShortCode: standings[i].team.tla,
								teamEmblem: standings[i].team.crest,
								competitionCode: response.data.competition.code
								

							}
							await updateStanding(standing);
						}
					}
					else {
						console.log('errrror');
						next({ message: i18n.__(ERROR_STANDING_NOT_CREATED_ERROR), status: 400 });
					}
			});
		}

	} catch (error) {
		next(error);
	}
};