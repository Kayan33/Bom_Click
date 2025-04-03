import puppeteerService from "../puppeteerService/puppeteerService";

export class BuscaTodosProdutos {
    async buscaProdutosTodos(nomeProduto: string) {
        const mercados = [
            { nome: "Confianca", url: "https://www.confianca.com.br" },
            { nome: "Tauste", url: "https://tauste.com.br/bauru/" },
        ];

        try {
            let TodosProdutos;

            // Se houver mais de um mercado, busca os produtos de ambos juntos
            if (mercados.length > 1) {
                TodosProdutos = await puppeteerService.buscaProdutosMercados(
                    nomeProduto,
                    mercados[0].url, // URL do Confiança
                    mercados[1].url  // URL do Tauste
                );
            } else {
                
            }

            return TodosProdutos;
        } catch (error) {
            console.error(`Erro ao buscar nos mercados:`, error);
            return { error: "Erro ao buscar produtos" };
        }
    }
}
