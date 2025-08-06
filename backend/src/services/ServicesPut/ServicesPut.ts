import prismaClient from "../../prisma";
import { hash, compare } from 'bcryptjs';

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
   async redefinirSenha({ id_usuario, senhaAtual, novaSenha }: { id_usuario: string, senhaAtual: string, novaSenha: string }) {
        if (!senhaAtual || !novaSenha) {
            throw new Error("Campos obrigatórios não preenchidos.");
        }

        const usuario = await prismaClient.usuario.findUnique({
            where: { id: id_usuario }
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }

        const senhaCorreta = await compare(senhaAtual, usuario.senha);

        if (!senhaCorreta) {
            throw new Error("A senha atual está incorreta.");
        }


         if (await compare(novaSenha, usuario.senha)) {
            throw new Error("A nova senha não pode ser igual à senha antiga.");
        }

        const novaSenhaHash = await hash(novaSenha, 8);

        await prismaClient.usuario.update({
            where: { id: id_usuario },
            data: { senha: novaSenhaHash }
        });

        return { message: "Senha atualizada com sucesso!" };
    }
}

export default ServicesPut;
