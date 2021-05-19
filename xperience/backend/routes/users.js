import express from 'express';
import { addPhoto, signin, signup, updatePassword } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/:id/addPhoto', addPhoto);
router.patch('/:id/updatePassword', updatePassword);

export default router;