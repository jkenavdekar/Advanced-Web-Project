import express from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent, addAttendee, cancelAttendee, addComment, toggleEvent, updatePhoto, updateCount } from '../controllers/events.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/', auth, createEvent);
router.patch('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.patch('/:id/addAttendee', auth, addAttendee);
router.patch('/:id/cancelAttendee', auth, cancelAttendee);
router.patch('/:id/addComment', auth, addComment);
router.patch('/:id/toggleEvent', auth, toggleEvent);
router.patch('/:id/updatePhoto', updatePhoto);
router.patch('/:id/updateCount', updateCount);

export default router;