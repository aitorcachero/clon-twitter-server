import usersModel from '../models/usersModel.js';

export default function usersController() {
  const createController = (req, res) => {
    const user = req.body;
    console.log(user);
    res.send('ok');
  };

  return { createController };
}
