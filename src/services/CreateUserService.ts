import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkuserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkuserExists) {
            throw new Error('Email address already used ');
        }

        // criptografando senha do usuario antes de salvar no banco
        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        // salvando no banco
        await usersRepository.save(user);

        // retornando o user
        return user;
    }
}

export default CreateUserService;
