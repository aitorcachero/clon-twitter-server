import db from '../db/dbConnect.js';

export default function usersModel() {
  const createUser = async (username, password, email, name, surname) => {
    try {
      const [result] = await db.query(
        `INSERT INTO users (username, password, email, name, surname)
      VALUES (?,?,?,?,?)`,
        [username, password, email, name, surname]
      );
      return { id: result.insertId, username, email, name, surname };
    } catch (error) {
      console.log(error);
    }
  };

  // const loginUser = async;

  const deleteUser = async (id) => {
    console.log('hola');
    try {
      const [result] = await db.query(`DELETE FROM users WHERE id = ?`, [id]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return { createUser, deleteUser };
}
