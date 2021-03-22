import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/appError';

import './database';

const app = express();

app.use(express.json());

// rota para exibir arquivos
// exemplo: base-url/files/nomeArq.png
app.use('/files', express.static(uploadConfig.directory));

// demais rotas da aplicação devem definidas dentro do arquivo routes passa a ser um middleware
app.use(routes);

// abaixo middleware de tratativa de erros
// obs.: deve sempre ficar depois das rodas , pois ele é uma interceptação
// para tratar o erro antes de voltar ao canal
app.use(
    (err: Error, request: Request, response: Response, next:NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);

app.listen(3333, () => {
    console.log('Server started on port 3333 !');
});
