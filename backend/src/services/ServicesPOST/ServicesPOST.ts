import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

class AlunoServices {
  async Cadastrar_Aluno({
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
  }
}

export default AlunoServices;
