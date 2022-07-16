/* eslint-disable @typescript-eslint/no-explicit-any */
import { match } from 'assert';
import { NextFunction, Response } from 'express';
var axios = require('axios');
import i18n from 'i18n';
import { MatchModel } from 'model/match';
import { createMatch, getMatch, updateMatch, getMatchsFromCompetition } from '../logic/match';

export const ERROR_MATCH_NOT_FOUND_ERROR = 'MATCH_NOT_FOUND_ERROR';
export const ERROR_MATCH_NOT_CREATED_ERROR = 'MATCH_NOT_CREATED_ERROR';

export const createMatchHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const matchId = await createMatch(req.body);
		if (matchId) {
			const result = await getMatch('' + matchId); 
			if (result) {
				res.json({
					match: result
				}) 
			}else {
				next({ message: i18n.__(ERROR_MATCH_NOT_FOUND_ERROR), status: 400 });
			}
		} else {
			next({ message: i18n.__(ERROR_MATCH_NOT_CREATED_ERROR), status: 400 });
		}
	} catch (error) {
		next(error);
	}
}

export const createAllMatchsHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		//var codes = ['BSA','ELC','PL','CL','EC','FL1','BL1','SA','DED','PPL','CLI','PD','WC'];
		var codes = ['BSA', 'ELC'];

		var config = {
			headers: {
				'X-Auth-Token': 'd44e56fc964a40e7a3f2d9ffaefce6f8'
			}	
		}
		for(var j = 0; j < codes.length; j++) {
			console.log('https://api.football-data.org/v4/competitions/' + codes[j] +'/matches');
			axios.get(
				'https://api.football-data.org/v4/competitions/' + codes[j] +'/matches', 
				config
			)
			.then(
				async function(response: { data: any; status: any; statusText: any; headers: any; config: any; }) {
					if(response.status == 200) {
						var matchs = response.data.matches
						for(var i = 0; i < matchs.length ; i++) {
							console.log(matchs[i]);
							var match = {
								apiID: matchs[i].id,
								date: matchs[i].utcDate,
								status: matchs[i].status,
								matchDay: matchs[i].matchday,
								stage: matchs[i].stage,
								fullTimeHomeScore: matchs[i].score.fullTime.home || 0,
								fullTimeAwayScore: matchs[i].score.fullTime.away || 0,
								halfTimeHomeScore: matchs[i].score.halfTime.home || 0,
								halfTimeAwayScore: matchs[i].score.halfTime.away || 0,
								result: matchs[i].score.winner || 'NO',
								competitionCode: matchs[i].competition.code,
								awayTeamApiID: matchs[i].awayTeam.id,
								awayTeamName: matchs[i].awayTeam.name,
								awayTeamShortName: matchs[i].awayTeam.shortName,
								awayTeamCode: matchs[i].awayTeam.tla,
								awayTeamEmblem: matchs[i].awayTeam.crest,
								homeTeamApiID: matchs[i].homeTeam.id,
								homeTeamName: matchs[i].homeTeam.name,
								homeTeamShortName: matchs[i].homeTeam.shortName,
								homeTeamCode: matchs[i].homeTeam.tla,
								homeTeamEmblem: matchs[i].homeTeam.crest
								

							}
							await createMatch(match);
						}
					}
					else {
						console.log('errrror');
						next({ message: i18n.__(ERROR_MATCH_NOT_CREATED_ERROR), status: 400 });
					}
			});
		}
		
	} catch (error) {
		console.log(error);
		next(error);
	}
}

export const getMatchHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const match = await getMatch(req.params.matchId)
		if (match) {
			res.json({
				match: match
			})
		} else {
			next({ message: i18n.__(ERROR_MATCH_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error)
	}
}

export const getMatchsFromCompetitionsHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const matchs = await getMatchsFromCompetition(req.params.competitionId)
		if (matchs) {
			res.json({
				matchs: matchs
			})
		} else {
			next({ message: i18n.__(ERROR_MATCH_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error)
	}
}

export const updateMatchHandler = async (req: any, res: Response, next: NextFunction) => {
	try {
		const match = await updateMatch(req.apiID, req.body);
		if (match) {
			res.json({
				apiID: match.apiID,
			});
		} else {
			next({ message: i18n.__(ERROR_MATCH_NOT_FOUND_ERROR), status: 400 });
		}
	} catch (error) {
		next(error);
	}
};


export const updateAllMatchsHandler = async (req: any, res: Response, next: NextFunction) => {
	try {

		var codes = ['BSA','ECL','PL','CL','EC','FL1','BL1','SA','DED','PPL','CLI','PD','WC'];

		var config = {
			headers: {
				'X-Auth-Token': 'd44e56fc964a40e7a3f2d9ffaefce6f8'
			}	
		}

		for(var j = 0; j < codes.length; j++) {
			axios.get(
				'https://api.football-data.org/v4/competitions/' + codes[j] +'/matches', 
				config
			)
			.then(
				async function(response: { data: any; status: any; statusText: any; headers: any; config: any; }) {
					if(response.status == 200) {
						var matchs = response.data.matches
						for(var i = 0; i < matchs.length ; i++) {
							var match = {
								apiID: matchs[i].id,
								date: matchs[i].utcDate,
								status: matchs[i].status,
								matchDay: matchs[i].matchday,
								stage: matchs[i].stage,
								fullTimeHomeScore: matchs[i].score.fullTime.home,
								fullTimeAwayScore: matchs[i].score.fullTime.away,
								halfTimeHomeScore: matchs[i].score.halfTime.home,
								halfTimeAwayScore: matchs[i].score.halfTime.away,
								result: matchs[i].score.winner || 'NO',
								competitionCode: matchs[i].competition.code,
								awayTeamApiID: matchs[i].awayTeam.id,
								awayTeamName: matchs[i].awayTeam.name,
								awayTeamShortName: matchs[i].awayTeam.shortName,
								awayTeamCode: matchs[i].awayTeam.tla,
								awayTeamEmblem: matchs[i].awayTeam.crest
								

							}
							await updateMatch(match.apiID, match);
						}
					}
					else {
						next({ message: i18n.__(ERROR_MATCH_NOT_CREATED_ERROR), status: 400 });
					}
			});
		}
		res.json({
			ok: 'POST OK'
		})

	} catch (error) {
		next(error);
	}
};