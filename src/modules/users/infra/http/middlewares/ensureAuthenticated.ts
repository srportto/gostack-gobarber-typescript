import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/appError';

interface ITokenPayloadDTO {
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
        throw new AppError('jtw token is missing', 401);
    }

    // uma vez o header presente, capturando o token do header ...
    // o codigo abaixo divide a string authHeader a partir do espaço '' em duas partes (type e token),
    // porem desse array vou trabalhar apenas com a segunda parte dele (token)
    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        // forçando tipos a variaveis no typeScript
        const { sub } = decoded as ITokenPayloadDTO;

        /**
         * Uma vez interceptada a requisição e a sessao estando valida , adicionar o id do usuario que se autenticou
         * a requisição para demais validações
         */

        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new AppError(' Invalid jwt token', 401);
    }
}
