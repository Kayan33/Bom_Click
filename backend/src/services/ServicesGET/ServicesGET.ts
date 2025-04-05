import prismaClient from "../../prisma";

class ServicesGet {
  async BuscaAluno() {
    try {
      const ver = await prismaClient.usuario.findMany({
        include: {},
      });
      return ver;
    } catch (error) {
      console.log(error);
      throw new Error("Erro interno ao buscar usuário.");
    }
  }

  async BuscaMercado() {
    try {
      const ver = await prismaClient.mercado.findMany({
        include: {},
      });
      return ver;
    } catch (error) {
      console.log(error);
      throw new Error("Erro interno ao buscar mercado.");
    }
  }

  async  BuscaProdutosIntercalados() {
    try {
      const produtos = await prismaClient.produto.findMany({
        include: {
          mercado: true,
        },
        orderBy: {
          title: 'asc',
        },
      });
  
      // Agrupar os produtos por mercadoId
      const produtosPorMercado: Record<number, typeof produtos> = {};
  
      for (const produto of produtos) {
        if (!produtosPorMercado[produto.mercadoId]) {
          produtosPorMercado[produto.mercadoId] = [];
        }
        produtosPorMercado[produto.mercadoId].push(produto);
      }
  
      const resultadoFinal: typeof produtos = [];
      let adicionou = true;
  
      // Intercalar os produtos: round-robin por mercado
      while (adicionou) {
        adicionou = false;
  
        for (const mercadoId of Object.keys(produtosPorMercado)) {
          const grupo = produtosPorMercado[Number(mercadoId)];
          if (grupo.length > 0) {
            resultadoFinal.push(grupo.shift()!); // Adiciona o primeiro produto do grupo
            adicionou = true;
          }
        }
      }
  
      return resultadoFinal;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao buscar produtos intercalados por mercado.");
    }
  }
  
  
  
  
  
}

export default ServicesGet;
