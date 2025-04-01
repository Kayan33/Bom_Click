import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string; 
}

export function verificaTokenSenha(
  req: Request,
  res: Response,
  next: NextFunction
) {
 
  const { token } = req.query;

  
  if (!token) {
    return res.status(401).json({ error: "Token inválido ou não fornecido!" });
  }

  try {
   
    const { sub } = verify(token as string, process.env.JWT_SECRETO as string) as Payload;

    
    req.usuarioID = sub;

    
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado!" });
  }
}
