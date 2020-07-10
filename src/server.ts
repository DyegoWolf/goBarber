import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();
app.use(express.json());

app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

// Middleware para tratativa de erros de forma global
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    // Se o erro é conhecido, retornar uma mensagem de forma 'amigável' ao front
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }

    console.error(err);

    // Erro desconhecido, portanto, tratá-lo de forma geral
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error!'
    })
});

app.listen(3333, () => {
  console.log('🚀️ Back-end started');
});
