import {getRepository} from 'typeorm';
import User from '../models/User';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';
import AppError from '../errors/AppError';

interface Request{
    user_id: string;
    avatarFileName: string;
}

class UpdateUserAvatarService{
    public async execute({user_id, avatarFileName}: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if(!user){
            throw new AppError('Only authenticated users can change avatar!', 401);
        }

        // Se usuário já possuir avatar, devemos deletá-lo para refletir a atual.
        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;
        usersRepository.save(user); // O método save atualiza um usuário que já existe no bd

        return(user);
    }
}

export default UpdateUserAvatarService;
