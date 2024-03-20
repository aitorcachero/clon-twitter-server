import express from 'express';
import cors from 'cors';

//Routes

import userRoutes from './routes/usersRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res, next) => {
  res.send('<h1>Bienvenido al clon de Twitter</h1>');
});

app.listen(3000, () =>
  console.log('Servidor funcionando en http://localhost:3000')
);
