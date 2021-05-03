import express from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/events.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/', createEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;