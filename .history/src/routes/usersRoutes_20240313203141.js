import express from 'express';
import usersController from '../controllers/usersController.js';

const router = express.Router();

router.post('/', usersController().createUser);
// router.post('/login', usersController().loginUser);
router.delete('/', usersController().deleteUser);

export default router;
