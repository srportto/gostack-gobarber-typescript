// Responsabilidades de uma rota: Receber requisições,
// chamar outro arquivo para tratar a requisição e devolver uma resposta

import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersControllers from '../controllers/UsersControllers';
import UserAvatarController from '../controllers/UserAvatarController';
// import { parseISO } from 'date-fns';
// import { getCustomRepository } from 'typeorm';
// import AppointmentsRepository from '../repositories/AppointmentsRepository';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

//
// startOfHour  -> transformar a hora 13:33 em 13:00, ou seja, ele starta/inicia a hora
// parseISO     -> transforma uma data de um outro padrao para ISO, padrao reconhecido pela biblioteca Date() do js
//                 Converte de string para Date()
// isEqual      -> valida se duas datas sao iguais

const usersRouter = Router();
const usersControllers = new UsersControllers();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

// para ca serao direcionadas todas as reuisições da rota: http://localhost:3333/appointments
// aonde abaixo sera tomada uma acao para cada metodo invocadado na rota (het, post, put, delete, ...)

usersRouter.post('/', usersControllers.create);

// patch: base_url/user/avatar
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
