import prismaClient from "../../prisma";

class ServicesPut {
  async alterarDadosAluno({
    id,
    nome,
    email,
    cpf,
    dataNascimento,
    cep,
    logradouro,
    bairro,
    numero,
  }: {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    dataNascimento: string;
    cep: string;
    logradouro: string;
    bairro: string;
    numero: number;

  }) {
    try {

      const usuarioExistente = await prismaClient.usuario.findUnique({
        where: { id }
      });

      if (!usuarioExistente) {
        return { error: "Usuário não encontrado." };
      }

      await prismaClient.usuario.update({
        where: {
          id: id,
        },
        data: {
          nome: nome,
          email: email,
          cpf: cpf,
          dataNascimento: dataNascimento,
          cep: cep,
          logradouro: logradouro,
          bairro: bairro,
          numero: numero,

        },
      });
      return { mensagem: "Alterado com Sucesso" };
    } catch (error) {
      console.log(error);
      throw new Error("Erro interno ao alterar dados usuário.");
    }
  }
}

export default ServicesPut;
