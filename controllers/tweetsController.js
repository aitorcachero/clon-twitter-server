import tweetsModel from '../models/tweetsModel.js';
export default function tweetsController() {
  const getAllTweets = async (req, res) => {
    try {
      const getTweets = await tweetsModel().getTweets();
      res.send({
        status: 'ok',
        data: getTweets,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTweetById = async (req, res) => {
    const { id } = req.params;
    try {
      const getTweet = await tweetsModel().getTweets(id);
      if (getTweet.length > 0) {
        const getComments = await tweetsModel().getTweetComments(id);

        res.send({
          status: 'ok',
          data: getTweet[0],
          comments: getComments,
        });
      } else {
        res.send({
          status: 'error',
          message: 'No existe el tweet',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTweetsByUsername = async (username) => {
    try {
      const getTweets = await tweetsModel().getTweetsByUsername(username);
      res.send({
        status: 'ok',
        data: getTweets,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createTweet = async (req, res) => {
    const userId = req.user;
    const { text } = req.body;
    if (!text || text === '') {
      res.send({
        status: 'error',
        message: 'El tweet no puede estar vacio.',
      });
      return;
    }

    try {
      const createTweet = await tweetsModel().createTweet(userId, text);
      if (createTweet.errno) {
        console.log(createTweet.error);
        res.send({
          status: 'error',
          message: createTweet.message,
        });
        return;
      }
      res.send({
        status: 'ok',
        data: createTweet,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (req, res) => {
    const userId = req.user;
    const { tweet_id, text } = req.body;
    if (!text || text === '') {
      res.send({
        status: 'error',
        message: 'El tweet no puede estar vacio.',
      });
      return;
    }

    try {
      const createComment = await tweetsModel().createComment(
        tweet_id,
        userId,
        text
      );
      if (createComment.errno) {
        console.log(createComment.error);
        res.send({
          status: 'error',
          message: createComment.message,
        });
        return;
      }
      res.send({
        status: 'ok',
        data: createComment,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async (req, res) => {
    const { id } = req.params;
    const getComments = await tweetsModel().getTweetComments(id);
    res.send({ status: 'ok', data: getComments });
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const likesFunction = async (req, res) => {
    const { id } = req.body;
    const user_id = req.user;
    try {
      const checkIsLiked = await tweetsModel().checkLikes(id, user_id);

      if (checkIsLiked.length === 0) {
        const like = tweetsModel().likeTweet(id, user_id);
        res.send({
          status: 'ok',
          message: `+`,
        });
      } else {
        const unlike = tweetsModel().unlikeTweet(id, user_id);
        res.send({
          status: 'ok',
          message: `-`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTweet = async (req, res) => {
    const { id } = req.body;
    try {
      const getTweet = await tweetsModel().getTweets(id);
      console.log(getTweet);
      if (getTweet.length === 0) {
        res.send({
          status: 'error',
          message: 'No existe el tweet',
        });
      } else {
        const deleteTweet = await tweetsModel().deleteTweet(id);
        res.send({
          status: 'ok',
          message: 'Tweet eliminado',
        });
        console.log(deleteTweet);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllTweets,
    getTweetById,
    getTweetsByUsername,
    createTweet,
    createComment,
    getComments,
    likesFunction,
    deleteTweet,
  };
}
