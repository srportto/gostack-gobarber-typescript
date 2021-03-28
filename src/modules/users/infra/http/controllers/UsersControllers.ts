import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersControllers {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;
        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        // deletando a senha do objeto users criado e apos persistir no banco para nao retornar no response
        // comentei porque estava acusando erro, mas é apenas um aviso e descomentado funciona
        // delete user.password;

        //  return response.json(user);

        // alteração para devolver a senha ocultada apos mudança do typescript de nao aceitar o delete ...(acima exemplo)
        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.createdAt,
            updated_at: user.updateAt,
        };

        return response.json(userWithoutPassword);
    }
}
