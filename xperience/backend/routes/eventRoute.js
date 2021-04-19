import express from 'express';

import { getEvents, getEventById } from "../controllers/eventController.js";

const router = express.Router()


// express router method to create route for getting all users
//router.route('/').get(getEvents)
router.get('/', getEvents)

// express router method to create route for getting users by id
//router.route('/:id').get(getEventById)
router.get('/:id', getEventById )

export default router