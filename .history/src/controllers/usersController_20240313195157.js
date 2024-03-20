import usersModel from '../models/usersModel.js';

export default function usersController() {
  const createController = async (req, res) => {
    const user = req.body;
    try {
      const newUser = await usersModel().createModel(user);

      res.send({
        status: 'ok',
        userCreated: newUser,
      });
    } catch (error) {
      console.log('Ha habido un error en el controller', error);
    }
  };

  const deleteController = async (req, res) => {
    const { id } = req.body;
    console.log('desde el controller', id);
    try {
      const deleteUser = await usersModel().deleteModel(id);
      console.log(deleteUser);
      res.send(deleteUser);
    } catch (error) {
      console.log(error);
    }
  };

  return { createController, deleteController };
}
