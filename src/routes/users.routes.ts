// Responsabilidades de uma rota: Receber requisições,
// chamar outro arquivo para tratar a requisição e devolver uma resposta

import { response, Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
// import { parseISO } from 'date-fns';
// import { getCustomRepository } from 'typeorm';
// import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

//
// startOfHour  -> transformar a hora 13:33 em 13:00, ou seja, ele starta/inicia a hora
// parseISO     -> transforma uma data de um outro padrao para ISO, padrao reconhecido pela biblioteca Date() do js
//                 Converte de string para Date()
// isEqual      -> valida se duas datas sao iguais

const usersRouter = Router();

const upload = multer(uploadConfig);

// para ca serao direcionadas todas as reuisições da rota: http://localhost:3333/appointments
// aonde abaixo sera tomada uma acao para cada metodo invocadado na rota (het, post, put, delete, ...)

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();

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
    } catch (err) {
        return response.status(400).json({ erro: err.message });
    }
});

// patch: base_url/user/avatar
usersRouter.patch('/avatar', ensureAuthenticated,upload.single('avatar'), async (request, response) => {
    try {
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });

        // alteração para devolver a senha ocultada apos mudança do typescript de nao aceitar o delete ...(acima exemplo)
        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.createdAt,
            updated_at: user.updateAt,
        };

        return response.json(userWithoutPassword);

    } catch (err) {
        return response.status(400).json({ erro: err.message });
    }
});

export default usersRouter;
