import prismaClient from "../../prisma";

class ServicesPut {
  async alterarDadosAluno({
    id,
    nome,
    cpf,
    dataNascimento,
    cep,
    logradouro,
    bairro,
    numero,
    email,
  }: {
    id: string;
    nome: string;
    cpf: string;
    dataNascimento: string;
    cep: string;
    logradouro: string;
    bairro: string;
    numero: number;
    email: string;
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
          cpf: cpf,
          dataNascimento: dataNascimento,
          cep: cep,
          logradouro: logradouro,
          bairro: bairro,
          numero: numero,
          email: email,
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
