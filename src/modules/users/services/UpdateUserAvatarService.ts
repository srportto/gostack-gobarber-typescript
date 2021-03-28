import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/appError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
    userid: string;
    avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ userid, avatarFileName }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(userid);

        if (!user) {
            throw new AppError(
                ' Only authenticated users can change avatar.',
                401,
            );
        }

        if (user.avatar) {
            // deletar avatar anterior

            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            // validar se o avatar está preenchido
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;
        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
