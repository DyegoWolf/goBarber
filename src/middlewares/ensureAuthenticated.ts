import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    // Validação do token JWT
    const authHeader = request.headers.authorization;

    // Token não foi obtido
    if(!authHeader){
        throw new Error('JWT token is missing!');
    }

    // Token JWT vem no formato 'Bearer token'
    // O Bearer não é necessário, por isso o seu campo está vazio
    const [, token] = authHeader.split(' ');

    const {secret} = authConfig.jwt;

    try{
        const decoded = verify(token, secret);

        // Forçando decoded a ter o formato da interface
        const {sub} = decoded as TokenPayload;

        // Request agora possuirá as informações do usuŕio autenticado
        request.user = {
            id: sub
        }

        return next();
    } catch(err){
        throw new Error('JWT token is invalid!');
    }
}

export default ensureAuthenticated;
