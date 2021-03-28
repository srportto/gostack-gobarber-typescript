import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/appError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
    email: string;
    password: string;
}

interface IResponseDTO {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        email,
        password,
    }: IRequestDTO): Promise<IResponseDTO> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('e-mail incorreto/ou senha', 401);
        }

        // user.password - senha obtida do banco criptografada
        // password - senha não criptograda enviada por quem está tentando o login

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('e-mail incorreto/ou senha', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
