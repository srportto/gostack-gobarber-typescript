import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/appError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkuserExists = await this.usersRepository.findByEmail(email);

        if (checkuserExists) {
            throw new AppError('Email address already used ');
        }

        // criptografando senha do usuario antes de salvar no banco
        const hashedPassword = await hash(password, 8);

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        // retornando o user
        return user;
    }
}

export default CreateUserService;
