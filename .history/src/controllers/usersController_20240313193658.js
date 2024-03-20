import usersModel from '../models/usersModel.js';

export default function usersController() {
  const createController = async (req, res) => {
    const user = req.body;
    console.log(user);
    try {
      const newUser = await usersModel().createModel(user);
      res.send(newUser);
    } catch (error) {
      console.log('Ha habido un error en el controller', error);
    }
  };

  return { createController };
}
