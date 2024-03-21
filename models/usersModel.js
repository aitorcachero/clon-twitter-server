import db from '../db/dbConnect.js';

export default function usersModel() {
  const getUserById = async (id) => {
    try {
      const [user] = await db.query(
        `SELECT id, username, name, surname, photo, description, createdAt FROM users WHERE id = ?;`,
        [id]
      );
      const [arrayOfFollows] = await db.query(
        `SELECT followed_id FROM followers WHERE follower_id = ?`,
        [id]
      );

      const [arrayOfLikes] = await db.query(
        `SELECT tweet_id FROM likes WHERE user_id = ?`,
        [id]
      );

      user[0].arrayOfFollows = arrayOfFollows
        .map((x) => Object.values(x))
        .flat();
      user[0].arrayOfTweetLikes = arrayOfLikes
        .map((x) => Object.values(x))
        .flat();
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByUsername = async (name) => {
    try {
      const [user] = await db.query(`SELECT * FROM users WHERE username = ?;`, [
        name,
      ]);
      const ID = user[0].id;
      const [follows] = await db.query(
        `SELECT follower_id FROM followers WHERE follower_id = ? `,
        [ID]
      );
      const [followers] = await db.query(
        `SELECT followed_id FROM followers WHERE followed_id = ?`,
        [ID]
      );
      user[0].arrayOfFollows = follows.map((x) => Object.values(x)).flat();
      user[0].arrayOfFollowers = followers.map((x) => Object.values(x)).flat();
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserByEmail = async (email) => {
    try {
      const [result] = await db.query(`SELECT * FROM users WHERE email = ?`, [
        email,
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (
    username,
    password,
    email,
    name,
    surname,
    description
  ) => {
    try {
      const [result] = await db.query(
        `INSERT INTO users (username, password, email, name, surname, description)
      VALUES (?,?,?,?,?,?)`,
        [username, password, email, name, surname, description]
      );
      return {
        id: result.insertId,
        username,
        email,
        name,
        surname,
        description,
      };
    } catch (error) {
      console.log(error);
    }
  };

  // const loginUser = async;

  const deleteUser = async (id) => {
    try {
      const [result] = await db.query(`DELETE FROM users WHERE id = ?`, [id]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = async (id) => {
    try {
      const [followers] = await db.query(
        `SELECT F.follower_id, U.username, U.name, U.surname, U.photo, U.description FROM followers F LEFT JOIN users U ON F.follower_id = U.id WHERE followed_id = ?`,
        [id]
      );
      return followers;
    } catch (error) {
      console.log(error);
    }
  };

  const getFollows = async (id) => {
    try {
      const [follows] = await db.query(
        `SELECT F.followed_id, U.username, U.name, U.surname, U.photo, U.description FROM followers F LEFT JOIN users U ON F.followed_id = U.id WHERE follower_id = ?`,
        [id]
      );
      return follows;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getUserById,
    getUserByUsername,
    getUserByEmail,
    createUser,
    deleteUser,
    getFollowers,
    getFollows,
  };
}
