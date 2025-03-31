import { Request, Response } from "express";
import ServicesPost from "../../services/ServicesPOST/ServicesPOST";

class ControllerPost {
  async cadastro_Usuarios(req: Request, res: Response) {
    try {
      const {
        nome,
        cpf,
        dataNascimento,
        senha,
        cep,
        logradouro,
        bairro,
        numero,
        email,
      } = req.body;

      const servicesPost = new ServicesPost();
      const resposta = await servicesPost.CadastroUsuarios({
        nome,
        cpf,
        dataNascimento,
        senha,
        cep,
        logradouro,
        bairro,
        numero,
        email,
      });

      return res.status(201).json(resposta);
    } catch (error) {
      console.error("Erro no cadastro de usuário:", error);
      return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
}

export default ControllerPost;
