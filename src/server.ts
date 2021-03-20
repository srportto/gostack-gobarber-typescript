import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());

//rota para exibir arquivos
// exemplo: base-url/files/nomeArq.png
app.use('/files', express.static(uploadConfig.directory));

// demais rotas da aplicação devem definidas dentro do arquivo routes passa a ser um middleware
app.use(routes);

app.listen(3333, () => {
    console.log('Server started on port 3333 !');
});
