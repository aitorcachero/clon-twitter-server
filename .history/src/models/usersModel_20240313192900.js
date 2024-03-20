import db from '../db/dbConnect.js';

export default function usersModel() {
  const createModel = async (user) => {
    try {
      const { username, password, email, name, surname } = user;
      console.log(email);
      // const result = await db.query(
      //   `INSERT INTO users (username, password, email, name, surname)
      // VALUES (?,?,?,?,?)`,
      //   [username, password, email, name, surname]
      // );
      // return result;
    } catch (error) {
      console.log(error);
    }
  };

  return { createModel };
}
