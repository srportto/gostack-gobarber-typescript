import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

/**
 * Principio KISS -> Keep It simple & Stupid
 * ou 'mamtenha simples e stupido' o seu codigo
 *
 */

@Entity('users') // exatamente o nome da tabela do banco de dados criada na migration
class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // indicacao de campo string
    @Column()
    name: string;

    // indicacao de campo string
    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}

export default Users;
