import usersModel from '../models/usersModel.js';

export default function usersController() {
  const createController = async (req, res) => {
    const user = req.body;
    try {
      const newUser = await usersModel().createModel;
      console.log(user);
    } catch (error) {}
    res.send('ok');
  };

  return { createController };
}
