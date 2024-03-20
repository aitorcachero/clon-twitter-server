import express from 'express';
import authUser from '../middlewares/authUser.js';
import tweetsController from '../controllers/tweetsController.js';

const router = express.Router();

router.get('/:id', tweetsController().getTweetById);
router.get('/comments/:id', tweetsController().getComments);
router.post('/comments', authUser, tweetsController().createComment);
router.post('/like', authUser, tweetsController().likesFunction);
router.get('/', tweetsController().getAllTweets);
router.post('/', authUser, tweetsController().createTweet);
router.delete('/', authUser, tweetsController().deleteTweet);

export default router;
