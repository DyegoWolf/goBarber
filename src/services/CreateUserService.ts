import User from '../models/User';
import {getRepository} from 'typeorm';
import {hash} from 'bcryptjs';
import AppError from '../errors/AppError';

interface Request{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    public async execute({name, email, password}: Request): Promise<User>{
        const userRepository = getRepository(User);

        // Email deve ser único
        const checkUserExists = await userRepository.findOne({
            where: {email:email}
        });

        if(checkUserExists){
            throw new AppError('Email addres already used!', 400);
        }

        // Hash da senha do usuário
        const hashedPassword = await hash(password, 8);

        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await userRepository.save(newUser);

        return(newUser);
    }
}

 export default CreateUserService;
