import User from '../models/User';
import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';

interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User;
}

class AuthenticateUserService{
    public async execute({email, password}: Request): Promise<Response>{
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {email: email}
        });

        // Se o e-mail não existe na base de dados
        if(!user){
            throw new Error('Incorrect e-mail/password combination!');
        }

        const matchedPassword = await compare(password, user.password);

        // Se a senha recebida não bateu com a senha salva no banco de dados
        if(!matchedPassword){
            throw new Error('Incorrect e-mail/password combination!');
        }

        return({user});
    }
}

export default AuthenticateUserService;
