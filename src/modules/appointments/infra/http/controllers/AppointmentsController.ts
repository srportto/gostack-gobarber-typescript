import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentServices';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // provider = profissional/ barbeiro que ira atender o cliente
        // date  = timestamp (data e hora agendada para atendimento)
        const { providerId, date } = request.body;

        // const parseDate = startOfHour(parseISO(date));
        const parseDate = parseISO(date);

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            providerId,
            date: parseDate,
        });

        return response.json(appointment);
    }
}
