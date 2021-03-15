import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';
import { sign} from 'jsonwebtoken';

interface RequestDTO {
    email: string;
    password: string;
}

interface ResponseDTO {
    user: User;
    token: string;

}

class AuthenticateUserService {
    public async execute({email, password}: RequestDTO): Promise<ResponseDTO> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({where: {email}});

        if(!user){
            throw new Error('e-mail incorreto/ou senha')
        }

        //user.password - senha obtida do banco criptografada
        //password - senha não criptograda enviada por quem está tentando o login

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new Error('e-mail incorreto/ou senha')
        }

        const token = sign(
            {},
            '2b8853de28e5a0a3c09bacb9fd6e242d',
            {
               subject: user.id,
               expiresIn: '1d',
            }
        );

        return {user, token };

    }

}

export default AuthenticateUserService;
