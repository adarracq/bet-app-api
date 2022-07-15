import express from 'express';
import { createCompetitionHandler, getCompetitionHandler, updateCompetitionHandler, createAllCompetitionsHandler, updateAllCompetitionsHandler, getAllCompetitionsHandler } from '../handlers/competition';
import { validatePayload } from '../middlewares/json-schema';
import updateCompetitionSchema from '../schemas/competition/update.json';
import createCompetitionSchema from '../schemas/competition/create.json';

const competitionRoutes = express.Router();

/**
 * @api {post} /api/v1/competition create a competition
 * @apiName CreateCompetition
 * @apiParam (Body Request Fields) {String} email competition email.
 * @apiParam (Body Request Fields) {String} firstName competition first name.
 * @apiParam (Body Request Fields) {String} lastName competition last name.
 * @apiParam (Body Request Fields) {String} phoneNumber competition phone number.
 * @apiParam (Socket channel: updateCompetition) {Competition} competition.
 * @apiGroup Competition
 * @apiVersion 1.0.0
 * 
 */
 competitionRoutes.post('/', validatePayload(createCompetitionSchema), createCompetitionHandler)


 /**
 * @api {post} /api/v1/competitions/all create all competitions
 * @apiName CreateCompetition
 * @apiParam (Body Request Fields) {String} email competition email.
 * @apiParam (Body Request Fields) {String} firstName competition first name.
 * @apiParam (Body Request Fields) {String} lastName competition last name.
 * @apiParam (Body Request Fields) {String} phoneNumber competition phone number.
 * @apiParam (Socket channel: updateCompetition) {Competition} competition.
 * @apiGroup Competition
 * @apiVersion 1.0.0
 * 
 */
  competitionRoutes.post('/post/all', createAllCompetitionsHandler)


/**
 * @api {get} /api/v1/competition/:competitionId get a competition by id
 * @apiName GetCompetition
 * @apiParam (body param field) {string} competitionId competition id
 * @apiParam (Socket channel: getCompetition) {Competition} competition.
 * @apiGroup Competition
 * @apiVersion 1.0.0
 */
 competitionRoutes.get('/:competitionId', getCompetitionHandler)


 competitionRoutes.get('/', getAllCompetitionsHandler)

/**
 * @api {patch} /api/v1/competition/:competitionId update an competition
 * @apiName UpdateCompetition
 * @apiParam (Body Request Fields) {String} email competition email.
 * @apiParam (Body Request Fields) {String} firstName competition first name.
 * @apiParam (Body Request Fields) {String} lastName competition last name.
 * @apiParam (Body Request Fields) {String} phoneNumber competition phone number.
 * @apiParam (Socket channel: updateCompetition) {Competition} competition.
 * @apiDescription update an competition
 * @apiGroup Competition
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization Competition unique access-key (Format : 'Bearer ' + JWT).
 */
 competitionRoutes.patch('/:competitionId', validatePayload(updateCompetitionSchema), updateCompetitionHandler);

 competitionRoutes.patch('/update/all', updateAllCompetitionsHandler);


export default competitionRoutes;
