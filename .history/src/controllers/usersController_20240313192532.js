import usersModel from '../models/usersModel.js';

export default function usersController() {
  const createController = async (req, res) => {
    const user = req.body;
    try {
      const newUser = await usersModel().createModel(user);
      console.log(newUser);
      res.send(newUser);
    } catch (error) {
      console.log('Ha habido un error en el controller', error);
    }
    res.send('ok');
  };

  return { createController };
}
