import express from 'express';
import { createUserHandler, getUserContestsHandler, getUserHandler, updateUserHandler } from '../handlers/user';
import { validatePayload } from '../middlewares/json-schema';
import updateUserSchema from '../schemas/user/update.json';
import createUserSchema from '../schemas/user/create.json';

const userRoutes = express.Router();

/**
 * @api {post} /api/v1/user create an user
 * @apiName CreateUser
 * @apiParam (Body Request Fields) {String} email user email.
 * @apiParam (Body Request Fields) {String} firstName user first name.
 * @apiParam (Body Request Fields) {String} lastName user last name.
 * @apiParam (Body Request Fields) {String} phoneNumber user phone number.
 * @apiParam (Socket channel: updateUser) {User} user.
 * @apiGroup User
 * @apiVersion 1.0.0
 * 
 */
userRoutes.post('/', validatePayload(createUserSchema), createUserHandler)

/**
 * @api {get} /api/v1/user/:userId/events get all event per user by id
 * @apiName GetUserEvents
 * @apiParam (body param field) {string} userId user id
 * @apiParam (Socket channel: getUser) {User} user.
 * @apiGroup User
 * @apiVersion 1.0.0
 */
userRoutes.get('/:userId/contests', getUserContestsHandler)

/**
 * @api {get} /api/v1/user/:userId get an user by id
 * @apiName GetUser
 * @apiParam (body param field) {string} userId user id
 * @apiParam (Socket channel: getUser) {User} user.
 * @apiGroup User
 * @apiVersion 1.0.0
 */
userRoutes.get('/:userId', getUserHandler)

/**
 * @api {patch} /api/v1/user/:userId update an user
 * @apiName UpdateUser
 * @apiParam (Body Request Fields) {String} email user email.
 * @apiParam (Body Request Fields) {String} firstName user first name.
 * @apiParam (Body Request Fields) {String} lastName user last name.
 * @apiParam (Body Request Fields) {String} phoneNumber user phone number.
 * @apiParam (Socket channel: updateUser) {User} user.
 * @apiDescription update an user
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiHeader {String} Authorization User unique access-key (Format : 'Bearer ' + JWT).
 */
userRoutes.patch('/:userId', validatePayload(updateUserSchema), updateUserHandler);

export default userRoutes;
