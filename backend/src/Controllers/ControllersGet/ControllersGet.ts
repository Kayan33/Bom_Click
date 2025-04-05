import { Request, Response } from "express";
import ServicesGet from "../../services/ServicesGET/ServicesGET";

class ControllerGet {
  async BuscaUsuarios(req: Request, res: Response) {
    try {
      const servicesGet = new ServicesGet();
      const resposta = await servicesGet.BuscaAluno();
      return res.json(resposta);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ error: "Erro ao buscar usuário." });
    }
  }

  async BuscaMercado(req: Request, res: Response) {
    try {
      const servicesGet = new ServicesGet();
      const resposta = await servicesGet.BuscaMercado();
      return res.json(resposta);
    } catch (error) {
        console.error("Erro ao buscar mercado:", error);
      return res.status(500).json({ error: "Erro ao buscar mercado." });
    }
  }
}

export default ControllerGet;
