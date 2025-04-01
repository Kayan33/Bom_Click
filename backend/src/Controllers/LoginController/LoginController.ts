import { Request, Response } from "express";
import { LoginServices } from "../../services/Login/LoginServices";

class loginController {
  async loginUsuario(req: Request, res: Response) {
    const { email, senha } = req.body;
    const loginServices = new LoginServices();
    const resposta = await loginServices.loginUsuario({
      email,
      senha,
    });
    return res.json(resposta);
  }
  

  async verificaTokenUsuario(req: Request, res: Response){
    const id = req.params.id
    const loginServices = new LoginServices();
    try {
        
        const  resposta = await loginServices.verificaTokenUsuario(id)
        return res.json(resposta)
    } catch (error) {
        throw new Error("Verificação falhou");
        
    }
  }
}

export { loginController };
