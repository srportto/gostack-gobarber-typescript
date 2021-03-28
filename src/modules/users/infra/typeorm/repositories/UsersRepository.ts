import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
    private ormRespository: Repository<User>;

    constructor() {
        this.ormRespository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRespository.findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRespository.findOne({
            where: { email },
        });

        return user;
    }

    public async create({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<User> {
        const user = this.ormRespository.create({
            name,
            email,
            password,
        });

        await this.ormRespository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRespository.save(user);
    }
}

export default UsersRepository;
