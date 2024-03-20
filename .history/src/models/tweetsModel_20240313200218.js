import db from '../db/dbConnect.js';

export default function tweetsModel() {
  const createTweet = async (user, text) => {
    try {
      const [result] = await db.query(
        `INSERT INTO tweets (user_id, tweet_text) VALUES (?,?)`,
        [user, text]
      );
    } catch (error) {
      console.log(error);
    }
  };
}
