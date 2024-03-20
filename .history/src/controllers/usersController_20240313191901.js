import usersModel from '../models/usersModel.js';

export default function usersController() {
  const createController = (req, res) => {
    console.log('Esto entra');
    res.send('ok');
  };

  return { createController };
}
