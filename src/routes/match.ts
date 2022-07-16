import express from 'express';
import { createMatchHandler, getMatchHandler, updateMatchHandler, createAllMatchsHandler, updateAllMatchsHandler, getMatchsFromCompetitionsHandler, getMatchsByMatchDayHandler } from '../handlers/match';
import { validatePayload } from '../middlewares/json-schema';
import updateMatchSchema from '../schemas/match/update.json';
import createMatchSchema from '../schemas/match/create.json';

const matchRoutes = express.Router();


matchRoutes.post('/', validatePayload(createMatchSchema), createMatchHandler)



matchRoutes.post('/post/all', createAllMatchsHandler)


matchRoutes.get('/:matchId', getMatchHandler)


matchRoutes.get('/competition/:competitionId', getMatchsFromCompetitionsHandler)

matchRoutes.get('/competition/:competitionId/:matchDay', getMatchsByMatchDayHandler)


matchRoutes.patch('/:apiID', updateMatchHandler);

matchRoutes.patch('/update/all', updateAllMatchsHandler);


export default matchRoutes;
