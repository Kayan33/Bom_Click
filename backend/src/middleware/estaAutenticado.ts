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
    const authToken = req.headers.authorization;

    if (!authToken) {
       
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    const [, Token] = authToken.split(' ');

    try {
        const { sub } = verify(
            Token,
            process.env.JWT_SECRETO as string
        ) as Payload;

      
        req.id_usuario = sub;

        return next(); 

    } catch (error) {
       
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
}