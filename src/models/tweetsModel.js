import db from '../db/dbConnect.js';

export default function tweetsModel() {
  const getTweets = async (id) => {
    try {
      if (!id) {
        const [result] = await db.query(
          `SELECT tweets.tweet_id,
       tweets.user_id,
       tweets.tweet_text,
       COALESCE(comment_counts.comment_count, 0) AS comment_count,
       COALESCE(like_counts.like_count, 0) AS like_count,
       COALESCE(follower_counts.follower_count, 0) AS follower_count,
       COALESCE(following_counts.following_count, 0) AS following_count,
       tweets.createdAt,
       users.id,
       users.username,
       users.name,
       users.surname
FROM tweets
INNER JOIN users ON tweets.user_id = users.id
LEFT JOIN (
    SELECT tweet_id, COUNT(*) AS comment_count
    FROM comments
    GROUP BY tweet_id
) AS comment_counts ON tweets.tweet_id = comment_counts.tweet_id
LEFT JOIN (
    SELECT tweet_id, COUNT(*) AS like_count
    FROM likes
    GROUP BY tweet_id
) AS like_counts ON tweets.tweet_id = like_counts.tweet_id
LEFT JOIN (
    SELECT followed_id, COUNT(*) AS follower_count
    FROM followers
    GROUP BY followed_id
) AS follower_counts ON tweets.user_id = follower_counts.followed_id
LEFT JOIN (
    SELECT follower_id, COUNT(*) AS following_count
    FROM followers
    GROUP BY follower_id
) AS following_counts ON tweets.user_id = following_counts.follower_id
ORDER BY tweets.createdAt DESC;`
        );
        return result;
      } else {
        const [result] = await db.query(
          `SELECT tweets.tweet_id,
       tweets.user_id,
       tweets.tweet_text,
       COALESCE(comment_counts.comment_count, 0) AS comment_count,
       COALESCE(like_counts.like_count, 0) AS like_count,
       COALESCE(follower_counts.follower_count, 0) AS follower_count,
       COALESCE(following_counts.following_count, 0) AS following_count,
       tweets.createdAt,
       users.id,
       users.username,
       users.name,
       users.surname
FROM tweets
INNER JOIN users ON tweets.user_id = users.id
LEFT JOIN (
    SELECT tweet_id, COUNT(*) AS comment_count
    FROM comments
    GROUP BY tweet_id
) AS comment_counts ON tweets.tweet_id = comment_counts.tweet_id
LEFT JOIN (
    SELECT tweet_id, COUNT(*) AS like_count
    FROM likes
    GROUP BY tweet_id
) AS like_counts ON tweets.tweet_id = like_counts.tweet_id
LEFT JOIN (
    SELECT followed_id, COUNT(*) AS follower_count
    FROM followers
    GROUP BY followed_id
) AS follower_counts ON tweets.user_id = follower_counts.followed_id
LEFT JOIN (
    SELECT follower_id, COUNT(*) AS following_count
    FROM followers
    GROUP BY follower_id
) AS following_counts ON tweets.user_id = following_counts.follower_id
WHERE user_id = ?
ORDER BY tweets.createdAt DESC;`,
          [id]
        );
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTweetsByUsername = async (username) => {
    try {
      const result = await db.query(
        `SELECT * FROM tweets WHERE user_id = (SELECT id FROM users WHERE username = ?)`,
        [username]
      );

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getTweetComments = async (id) => {
    try {
      const [result] = await db.query(
        `SELECT C.id,
       C.tweet_id,
       C.user_id,
       C.COMMENT,
       C.createdAt,
       U.id,
       U.username,
       U.name,
       U.surname
FROM comments C
INNER JOIN users U ON C.user_id = U.id
WHERE C.tweet_id = ?
ORDER BY C.createdAt DESC;`,
        [id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const createTweet = async (user, text) => {
    try {
      const [result] = await db.query(
        `INSERT INTO tweets (user_id, tweet_text) VALUES (?,?)`,
        [user, text]
      );
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const createComment = async (t_id, u_id, text) => {
    try {
      const [result] = await db.query(
        `INSERT INTO comments (tweet_id, user_id, comment) VALUES (?,?,?)`,
        [t_id, u_id, text]
      );
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const deleteTweet = async (id) => {
    try {
      const [result] = await db.query(`DELETE FROM tweets WHERE tweet_id = ?`, [
        id,
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const checkLikes = async (tweet_id, user_id) => {
    try {
      const [result] = await db.query(
        `SELECT * FROM likes WHERE tweet_id = ? AND user_id = ?`,
        [tweet_id, user_id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const likeTweet = async (tweet_id, user_id) => {
    try {
      const [result] = await db.query(
        `INSERT INTO likes (tweet_id, user_id) VALUES (?,?)`,
        [tweet_id, user_id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const unlikeTweet = async (tweet_id, user_id) => {
    try {
      const [result] = await db.query(
        `DELETE FROM likes WHERE tweet_id = ? AND user_id = ?`,
        [tweet_id, user_id]
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getTweets,
    getTweetsByUsername,
    getTweetComments,
    createTweet,
    createComment,
    deleteTweet,
    checkLikes,
    likeTweet,
    unlikeTweet,
  };
}
