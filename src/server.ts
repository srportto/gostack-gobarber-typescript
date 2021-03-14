import 'reflect-metadata';
import express from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());

// todas as rotas definidas dentro do arquivo routes passa a ser um middleware
app.use(routes);

app.listen(3333, () => {
    console.log('Server started on port 3333 !');
});
