import { Request, Response } from "express";
import ServicesPost from "../../services/ServicesPOST/ServicesPOST";
import ServicesDelete from "../../services/ServicesDelete/ServicesDelete";

class ControllerDelete {
  async DeletarUsuarioUnico(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const servicesDelete = new ServicesDelete();
      const resposta = await servicesDelete.DeletarUsuarioUnico(id);
      return res.json(resposta);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res.status(500).json({ error: "Erro ao deletar usuário." });
    }
  }
}

export default ControllerDelete;
