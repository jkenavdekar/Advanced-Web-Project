import { getEvents, getEventById } from "../controllers/eventController.js";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getEvents)

// express router method to create route for getting users by id
router.route('/:id').get(getEventById)

export default router