import { Request, Response } from "express";
import ServicesPut from "../../services/ServicesPut/ServicesPut";

class ControllerPut {
  async AlteraDadosUsuario(req: Request, res: Response) {
    try {
      const {
        nome,
        cpf,
        dataNascimento,
        cep,
        logradouro,
        bairro,
        numero,
        email,
      } = req.body;
      const{id}=req.params

      const servicesPut = new ServicesPut();
      const resposta = await servicesPut.alterarDadosAluno({
        id,
        nome,
        cpf,
        dataNascimento,
        cep,
        logradouro,
        bairro,
        numero,
        email,
      });

      return res.status(201).json(resposta);
    } catch (error) {
      console.error("Erro no alterar usuario:", error);
      return res.status(500).json({ error: "Erro ao alterar usuario." });
    }
  }
}

export default ControllerPut;
