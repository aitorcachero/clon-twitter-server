import followersModel from '../models/followersModel.js';
import usersModel from '../models/usersModel.js';

export default function followersController() {
  const followFunction = async (req, res) => {
    // Chequeamos que el user no se de follow a si mismo
    const idAuth = req.user;
    const { username } = req.body;
    try {
      const [user] = await usersModel().getUserByUsername(username);
      if (user.length === 0) {
        res.send({
          status: 'error',
          message: 'El usuario no existe',
        });
        return;
      }
      if (user.id === idAuth) {
        res.send({
          status: 'error',
          message: 'No puedes seguirte a ti mismo',
        });
        return;
      }
      const checkIsFollowed = await followersModel().checkFollows(
        idAuth,
        user.id
      );

      console.log(checkIsFollowed);

      if (checkIsFollowed.length === 0) {
        const follow = followersModel().followUser(idAuth, user.id);
        res.send({
          status: 'ok',
          message: `Ahora sigues a @${username}`,
        });
      } else {
        const unfollow = followersModel().unfollowUser(idAuth, user.id);
        res.send({
          status: 'ok',
          message: `Has dejado de seguir a @${username}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { followFunction };
}
