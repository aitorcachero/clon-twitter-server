import express from 'express';
import usersController from '../controllers/usersController.js';

const router = express.Router();

// router.get('/', getUserController);
router.post('/', usersController().createController);
router.delete('/', usersController().deleteController);
// router.post('/login', getIdLogin, loginUserController);
// router.get('/profile', authUser, getUserController);

export default router;