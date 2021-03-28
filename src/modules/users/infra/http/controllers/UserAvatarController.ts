import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);
        const user = await updateUserAvatar.execute({
            userid: request.user.id,
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
    }
}
