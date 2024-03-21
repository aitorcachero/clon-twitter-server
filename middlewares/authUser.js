// Importamos las dependencias
import jwt from 'jsonwebtoken';

// Importamos las configuraciones
import { SECRET } from '../config.js';

export default async function authUser(req, res, next) {
  const authorization = req?.headers?.authorization;

  if (!authorization) {
    res.send({
      status: 'error',
      message: 'No estás autorizado',
    });
    return;
  }
  try {
    // Variable que almacenará la información del token una vez desencriptado.
    const userInfoID = jwt.verify(authorization, SECRET).id;

    // Agregamos una nueva propiedad inventada por nosotros al objeto "request".
    req.user = userInfoID;

    next();
  } catch (error) {
    console.log(error);
    if (
      error.name === 'JsonWebTokenError' &&
      error.message === 'invalid token'
    ) {
      res.send({
        status: 'error',
        message: 'Token invalido',
      });
    } else {
      res.send({ error });
    }
  }
}
