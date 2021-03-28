import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRespository: Repository<Appointment>;

    constructor() {
        this.ormRespository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRespository.findOne({
            where: { date },
        });

        // se findAppointment preenchido (diferente de undefined) retorna ele, se nao (||) retorna null/undefined
        return findAppointment || undefined;
    }

    public async create({
        providerId,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRespository.create({ providerId, date });

        await this.ormRespository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
