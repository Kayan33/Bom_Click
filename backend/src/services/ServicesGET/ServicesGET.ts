
import prismaClient from "../../prisma";

class ServicesGet {

    async BuscaAluno() {
      try {
        const ver = await prismaClient.usuario.findMany({
          
          include:{
            
          }
        });
        return ver
      } catch (error) {
        console.log(error);
      throw new Error("Erro interno ao buscar usuário.");
      }
         
      }
  
}

export default ServicesGet;
