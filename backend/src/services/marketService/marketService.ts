import puppeteerService from "../puppeteerService/puppeteerService";



export class MarketService {
    async buscaProdutosEmTodosOsMercados(nomeProduto: string) {
        const mercados = [
            { nome: "Confianca", url: "https://www.confianca.com.br" },
            { nome: "Tauste", url: "https://tauste.com.br/bauru/" },
        ];

        // Realizando as buscas em paralelo
        const resultados = await Promise.all(
            mercados.map(async mercado => {
                try {
                    let resultado;
                    if (mercado.nome === "Confianca") {
                        resultado = await puppeteerService.buscaProdutosConfiança(nomeProduto, mercado.url);
                    } else if (mercado.nome === "Tauste") {
                        resultado = await puppeteerService.buscaProdutosTauste(nomeProduto, mercado.url);
                    }
                    return { [mercado.nome]: resultado };
                } catch (error) {
                    console.error(`Erro ao buscar no mercado ${mercado.nome}:`, error);
                    return { [mercado.nome]: "Erro ao buscar produtos" };
                }
            })
        );

        return Object.assign({}, ...resultados); // Combina os resultados de todos os mercados
    }
}
