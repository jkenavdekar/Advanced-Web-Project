import express from 'express';
import { createEvent, getEvents, updateEvent } from '../controllers/events.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/', createEvent);
router.patch('/:id', updateEvent);

export default router;