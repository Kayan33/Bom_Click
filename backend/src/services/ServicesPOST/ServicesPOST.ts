import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

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
}

export default ServicesPost;
