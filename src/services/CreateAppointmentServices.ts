import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/appError';

interface Request {
    providerId: string;
    date: Date;
}

/**
 * Prncipio: Dependency inversion/inversao de dependencia
 *  ou seja, é o conceito de que uma classe só pode existir se receber um objeto de outra,
 * essa amarração é feita no contrutor da classe, vide abaixo
 *
 */

//

class CreateAppointmentService {
    public async execute({ providerId, date }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        // se findAppointmentInSameDate for verdadeira, ou seja, preenchida ... há mais de um agendamento para a mesma data e horario o que é um erro
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            providerId,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
