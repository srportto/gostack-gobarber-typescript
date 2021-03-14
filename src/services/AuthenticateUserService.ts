import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface RequestDTO {
    email: string;
    password: string;
}

interface ResponseDTO {
    user: User;

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

        //se chegar até aqui ==> o usuario está autenticado
        return {user,  };

    }

}

export default AuthenticateUserService;
