import db from '../db/dbConnect.js';

export default function userModel() {
  const create = async ({ user }) => {
    try {
      const { username, password, email, name, surname } = user;
      const result = await db.query(
        `INSERT INTO users (username, password, email, name, surname)
      VALUES (?,?,?,?,?)`,
        [username, password, email, name, surname]
      );
      console.log(result);
    } catch (error) {}
  };
}
