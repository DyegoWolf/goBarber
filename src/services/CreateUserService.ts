import User from '../models/User';
import {getRepository} from 'typeorm';

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
            throw new Error('Email addres already used!');
        }

        const newUser = userRepository.create({
            name,
            email,
            password
        });

        await userRepository.save(newUser);

        return(newUser);
    }
}

 export default CreateUserService;
