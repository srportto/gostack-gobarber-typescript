import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        // se findAppointment preenchido (diferente de undefined) retorna ele, se nao (||) retorna null
        return findAppointment || null;
    }
}

export default AppointmentsRepository;
