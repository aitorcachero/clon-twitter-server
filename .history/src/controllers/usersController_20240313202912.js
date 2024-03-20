import { hashPassword } from '../helpers/encrypters.js';
import usersModel from '../models/usersModel.js';

export default function usersController() {
  const createUser = async (req, res) => {
    const { username, password, email, name, surname } = req.body;
    try {
      // Comprobamos si el usuario existe
      const getUserByName = await usersModel().getUserByName(username);
      if (getUserByName.length > 0) {
        res.send({
          status: 'error',
          message: 'Ya existe un usuario con ese username',
        });
        return;
      }
      console.log(getUserByName);

      // Comprobamos si el email existe
      const getUserByEmail = await usersModel().getUserByEmail(email);
      if (getUserByEmail.length > 0) {
        res.send({
          status: 'error',
          message: 'Ya existe un usuario con ese correo electrónico',
        });
        return;
      }
      console.log(getUserByEmail);

      const encryptPassword = await hashPassword(password);
      const newUser = await usersModel().createUser(
        username,
        encryptPassword,
        email,
        name,
        surname
      );

      res.send({
        status: 'ok',
        userCreated: newUser,
      });
    } catch (error) {
      console.log('Ha habido un error en el controller', error);
    }
  };

  const loginUser = async (req, res) => {
    res.send('login');
  };

  const deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
      const deleteUser = await usersModel().deleteUser(id);
      console.log(deleteUser);
      if (deleteUser.affectedRows === 1) {
        res.send('Usuario eliminado correctamente');
      } else {
        res.send('No existe el usuario');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { createUser, deleteUser };
}
