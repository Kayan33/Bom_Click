import { hash } from "bcryptjs";
import prismaClient from "../../prisma";
const axios = require('axios');
import cron, { ScheduledTask } from 'node-cron';

class ServicesPost {
  async CadastroUsuarios({
    nome,
    email,
    cpf,
    senha,
    dataNascimento,
    cep,
    logradouro,
    bairro,
    numero,

  }: {
    nome: string;
    email: string;
    cpf: string;
    senha: string;
    dataNascimento: string;
    cep: string;
    logradouro: string;
    bairro: string;
    numero: number;

  }) {
    try {

      const senhaCrypt = await hash(senha, 10);

      await prismaClient.usuario.create({
        data: {
          nome,
          email,
          cpf,
          senha: senhaCrypt,
          dataNascimento: dataNascimento,
          logradouro,
          numero,
          bairro,
          cep
        },
      });

      return { mensagem: "Cadastro efetuado com sucesso!" };
    } catch (error) {
      console.log(error);
      throw new Error("Erro interno ao cadastrar usuário.");

    }
  }

  async consultarUsuarioUnico(id: string) {
    try {
      const resposta = await prismaClient.usuario.findUnique({
        where: {
          id: id,
        },
        include: {

        }

      });
      if (!resposta) {
        return { error: "Usuário não encontrado." };
      }
      return resposta;
    } catch (error) {
      console.log(error);
      throw new Error("Erro interno ao buscar usuário unico.");
    }
  }

  async CadastroMercado({nome,logo}:{nome:string,logo:string}){
    try {
      await prismaClient.mercado.create({
        data:{
          nome,
          logo
        }
      })
      return { mensagem: "Cadastro efetuado com sucesso!" };
    } catch (error) {
      console.log(error);
      throw new Error("Erro interno ao cadastrar mercado.");
    }
  }

  

 
async  cadastrarProdutosDosMercados() {
  try {
    // Deleta tudo no banco de dados produto
    await prismaClient.produto.deleteMany({});

    const response = await axios.get("http://localhost:3333/BuscaPromocoes");
    const dadosMercados = response.data;

    for (const nomeMercado in dadosMercados) {
      const produtos = dadosMercados[nomeMercado];

      if (!Array.isArray(produtos)) {
        console.log(`O valor de ${nomeMercado} não é uma lista de produtos. Ignorando.`);
        continue;
      }

      const mercado = await prismaClient.mercado.findUnique({
        where: { nome: nomeMercado },
      });

      if (!mercado) {
        console.log(`Mercado não encontrado: ${nomeMercado}`);
        continue;
      }

      for (const produto of produtos) {
        const { title, price, imageUrl } = produto;

        if (!title || !price || !imageUrl) continue;

        await prismaClient.produto.create({
          data: {
            title,
            price,
            imageUrl,
            mercado: {
              connect: {
                id: mercado.id,
              },
            },
          },
        });
      }
    }

    return{mensagem:"Produtos cadastrados com sucesso!"};
  } catch (err) {
    console.log(err);
    throw new Error("Erro ao cadastrar produtos:");
    
  }
}
  
schedule(): void {
  cron.schedule('0 0 * * *', async () => {
    await this.cadastrarProdutosDosMercados();
  });
}

  
  
  
  
}

export default ServicesPost;
