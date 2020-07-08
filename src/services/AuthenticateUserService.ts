import User from '../models/User';
import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import authConfig from '../config/auth';

interface Request{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string;
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

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        });

        return({
            user,
            token
        });
    }
}

export default AuthenticateUserService;
