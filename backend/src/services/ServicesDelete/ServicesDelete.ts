import prismaClient from "../../prisma";

class ServicesDelete {
  async DeletarUsuarioUnico(id: string) {
      try {

        const usuarioExistente = await prismaClient.usuario.findUnique({
            where: { id }
        });

        if (!usuarioExistente) {
            return { error: "Usuário não encontrado." };
        }
        
         await prismaClient.usuario.delete({
          where: {
            id: id,
          },
          include:{
    
          }
          
        });
        
        return { mensagem: "Deletado com Sucesso" };
      } catch (error) {
        console.log(error);
        throw new Error("Erro interno ao deletar usuário.");
      }
    }
}

export default ServicesDelete;
