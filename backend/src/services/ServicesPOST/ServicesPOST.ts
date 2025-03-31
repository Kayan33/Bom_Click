import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

class ServicesPost {
  async CadastroUsuarios({
    nome,
    cpf,
    dataNascimento,
    senha,
    cep,
    logradouro,
    bairro,
    numero,
    email,
  }: {
    nome: string;
    cpf: string;
    dataNascimento: string;
    senha: string;
    cep: string;
    logradouro: string;
    bairro: string;
    numero: number;
    email: string;
  }) {
    try {
      
      const senhaCrypt = await hash(senha, 10);
  
      await prismaClient.usuario.create({
        data: {
          nome,
          cpf,
          dataNascimento: dataNascimento,
          senha: senhaCrypt,
          logradouro,
          numero,
          bairro,
          cep,
          email,
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
        include:{
  
        }
        
      });
      if (!resposta) {
        return {error: "Usuário não encontrado." };
    }
      return resposta;
    } catch (error) {
      console.log(error);
      throw new Error("Erro interno ao buscar usuário unico.");
    }
  }
}

export default ServicesPost;
