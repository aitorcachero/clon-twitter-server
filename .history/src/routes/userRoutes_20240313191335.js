import express from 'express';

const router = express.Router();

router.get('/', getUserController);
router.post('/', insertUserController);
router.post('/login', getIdLogin, loginUserController);
router.get('/profile', authUser, getUserController);

export default router;
