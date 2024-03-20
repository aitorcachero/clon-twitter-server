import express from 'express';
import cors from 'cors';

//Routes

import usersRoutes from './routes/usersRoutes.js';
import tweetsRoutes from './routes/tweetsRoutes.js';
import followRoutes from './routes/followersRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Express on Vercel'));

app.use('/users', usersRoutes);
app.use('/tweets', tweetsRoutes);
app.use('/follow', followRoutes);

app.listen(3000, () => console.log('Servidor funcionando en el puerto 3000'));
