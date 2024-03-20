import usersModel from '../models/usersModel.js';

export default function usersController() {
  const createController = (req, res) => {
    res.send('ok');
  };

  return { createController };
}
