// Responsabilidades de uma rota: Receber requisições,
// chamar outro arquivo para tratar a requisição e devolver uma resposta

import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

//
// startOfHour  -> transformar a hora 13:33 em 13:00, ou seja, ele starta/inicia a hora
// parseISO     -> transforma uma data de um outro padrao para ISO, padrao reconhecido pela biblioteca Date() do js
//                 Converte de string para Date()
// isEqual      -> valida se duas datas sao iguais

const appointmentsRouter = Router();

// para ca serao direcionadas todas as reuisições da rota: http://localhost:3333/appointments
// aonde abaixo sera tomada uma acao para cada metodo invocadado na rota (het, post, put, delete, ...)

// middlewares
appointmentsRouter.use(ensureAuthenticated);

// routes

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        // provider = profissional/ barbeiro que ira atender o cliente
        // date  = timestamp (data e hora agendada para atendimento)
        const { providerId, date } = request.body;

        // const parseDate = startOfHour(parseISO(date));
        const parseDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            providerId,
            date: parseDate,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ erro: err.message });
    }
});

export default appointmentsRouter;
