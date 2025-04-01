import { Request, Response } from "express";
import { LoginServices } from "../../services/Login/LoginServices";



class LoginController {
  async loginUsuario(req: Request, res: Response) {
    const { email, senha } = req.body;
    const loginServices = new LoginServices();
    const resposta = await loginServices.loginUsuario({ email, senha });
    return res.json(resposta);
  }

  async verificaTokenUsuario(req: Request, res: Response) {
    const id = req.usuarioID;
    const VerificaToken = new LoginServices();

    try {
      if (!id) {
        return res.status(400).json({ error: "Usuário não autenticado" });
      }

      const resposta = await VerificaToken.verificaTokenUsuario(id);
      return res.json(resposta);
    } catch (error) {
      return res.status(500).json({ error: "Verificação falhou" });
    }
  }
}

export default LoginController;
