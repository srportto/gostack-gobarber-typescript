import { startOfHour } from 'date-fns';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/appError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
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
@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({ providerId, date }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        // se findAppointmentInSameDate for verdadeira, ou seja, preenchida ... há mais de um agendamento para a mesma data e horario o que é um erro
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            providerId,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
