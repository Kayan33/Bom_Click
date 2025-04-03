import { Request, Response } from "express";
import { MarketService } from "../../services/marketService/marketService"; 

const marketService = new MarketService();

export class PuppeteerController {
    async buscaProdutos(req: Request, res: Response) {
        const { nomeProduto } = req.body; 

        try {
            const resultado = await marketService.buscaProdutosEmTodosOsMercados(nomeProduto);
            return res.json(resultado); // Retorna os resultados encontrados
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            return res.status(500).json({ error: "Erro ao buscar produtos" });
        }
    }

}
