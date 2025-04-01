import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function estaAutenticado(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const autToken = req.headers.authorization;

    if (!autToken) {
        return res.json({ error: 'Token Inválido' });
    }

    const [, Token] = autToken.split(' ');

    try {
        const { sub } = verify(
            Token,
            process.env.JWT_SECRETO as string
        ) as Payload;

        req.usuarioID = sub;
        return next();
    } catch (error) {
        return res.json({ error: 'Token Inválido' });
    }
}
