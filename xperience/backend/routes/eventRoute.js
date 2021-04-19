import express from 'express';

import { getAllEvents, getEventByUserId, createEvent, deleteEvent, eventSignUp } from "../controllers/eventController.js";

const router = express.Router()


// express router method to create route for getting all users
router.get('/', getAllEvents)
router.post('/', createEvent )
router.get('/:id', getEventByUserId )
router.delete('/:id', deleteEvent )
router.patch('/:id', eventSignUp )

export default router