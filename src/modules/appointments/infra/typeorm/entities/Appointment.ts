import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
/** Tipos de relacionamentos (cardinalidade)
 *
 * Um para um (OneToOne) -> Exemplo: Um usuario tem um unico agendamento *
 * Um para muito (OneToMany) -> Exemplo: Um usuario tem muitos agendamentos
 * Muitos para muitos (ManyToMany) -> Muitos usuarios participam dos mesmos agendamentos
 *
 */

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // indicacao de campo string/nome do prestador de serviço
    @Column()
    providerId: string;

    // abaixo composição de relacionamento, para se necessario obter todos os dados do usuario do agendamento
    // Relacionamento
    // varios agendamentos terá um unico usuario
    @ManyToOne(() => User)
    @JoinColumn({ name: 'providerId' }) // indicando a coluna que identifica unicamente o usuario em questão
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}

export default Appointment;
