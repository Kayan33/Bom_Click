import puppeteerService from "../puppeteerService/puppeteerService";



export class MarketService {
    async buscaProdutosEmTodosOsMercados(nomeProduto: string) {
        const mercados = [
            { nome: "Confianca", url: "https://www.confianca.com.br" },
            { nome: "Tauste", url: "https://tauste.com.br/bauru/" },
            { nome: "PaoAcucar", url: "https://www.paodeacucar.com/" }
        ];

        // Realizando as buscas em paralelo
        const resultados = await Promise.all(
            mercados.map(async mercado => {
        
                    let resultado;
                    if (mercado.nome === "Confianca") {
                        resultado = await puppeteerService.buscaProdutosConfiança(nomeProduto, mercado.url);
                    } else if (mercado.nome === "Tauste") {
                        resultado = await puppeteerService.buscaProdutosTauste(nomeProduto, mercado.url);
                    } else if (mercado.nome === "PaoAcucar") {
                        resultado = await puppeteerService.buscaProdutosPaoAcucar(nomeProduto, mercado.url);
                    }

                    return { [mercado.nome]: resultado };
            
            })
        );

        return Object.assign({}, ...resultados); // Combina os resultados de todos os mercados
    }
}
