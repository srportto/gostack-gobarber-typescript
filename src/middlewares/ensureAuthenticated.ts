import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayloadDTO {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('jtw token is missing');
    }

    // uma vez o header presente, capturando o token do header ...
    // o codigo abaixo divide a string authHeader a partir do espaço '' em duas partes (type e token),
    // porem desse array vou trabalhar apenas com a segunda parte dele (token)
    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        // forçando tipos a variaveis no typeScript
        const { sub } = decoded as TokenPayloadDTO;

        /**
         * Uma vez interceptada a requisição e a sessao estando valida , adicionar o id do usuario que se autenticou
         * a requisição para demais validações
         */

        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new Error(' Invalid jwt token');
    }
}
