import express from 'express';
import cors from 'cors';

//Routes

import usersRoutes from './routes/usersRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', usersRoutes);

app.listen(3000, () =>
  console.log('Servidor funcionando en http://localhost:3000')
);
