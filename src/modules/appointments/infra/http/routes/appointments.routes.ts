import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

//
// startOfHour  -> transformar a hora 13:33 em 13:00, ou seja, ele starta/inicia a hora
// parseISO     -> transforma uma data de um outro padrao para ISO, padrao reconhecido pela biblioteca Date() do js
//                 Converte de string para Date()
// isEqual      -> valida se duas datas sao iguais

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// para ca serao direcionadas todas as reuisições da rota: http://localhost:3333/appointments
// aonde abaixo sera tomada uma acao para cada metodo invocadado na rota (het, post, put, delete, ...)

// middlewares
appointmentsRouter.use(ensureAuthenticated);

// routes
// appointmentsRouter.get('/', async (request, response) => {
//     const appointmentsRepository = new AppointmentsRepository();
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
