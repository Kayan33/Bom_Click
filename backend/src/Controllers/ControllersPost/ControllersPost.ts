import { Request, Response } from "express";
import ServicesPost from "../../services/ServicesPOST/ServicesPOST";

class ControllerPost {
  async cadastro_Usuarios(req: Request, res: Response) {
    try {
      const {
        nome,
        email,
        cpf,
        senha,
        dataNascimento,
        cep,
        logradouro,
        bairro,
        numero
      } = req.body;

      const servicesPost = new ServicesPost();
      const resposta = await servicesPost.CadastroUsuarios({
        nome,
        email,
        cpf,
        senha,
        dataNascimento,
        cep,
        logradouro,
        bairro,
        numero
      });

      return res.status(201).json(resposta);
    } catch (error) {
      console.error("Erro no cadastro de usuário:", error);
      return res.status(500).json({ error: "Erro ao cadastrar usuário." });
    }

  }

  async BuscaUsuarioUnico(req: Request, res: Response) {

    try {

      const { id } = req.params
      const servicesPost = new ServicesPost();
      const resposta = await servicesPost.consultarUsuarioUnico(id)
      return res.json(resposta)
    } catch (error) {
      console.error("Erro ao buscar usuário unico:", error);
      return res.status(500).json({ error: "Erro ao buscar usuário unico." });
    }
  }
}

export default ControllerPost;
