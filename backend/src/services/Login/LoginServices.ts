import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

interface Login {
  email: string;
  senha: string;
}

class LoginServices {
  async loginUsuario({ email, senha }: Login) {
    const usuario = await prismaClient.usuario.findFirst({
      where: { email },
    });

    if (!usuario) {
      throw new Error("Usuário ou senha inválidos");
    }

    const senhaValida = await compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error("Usuário ou senha inválidos");
    }

    const token = sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
      process.env.JWT_SECRETO as string,
      {
        subject: usuario.id,
        expiresIn: "8h",
      }
    );

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token: token,
    };
  }

  

  async verificaTokenUsuario(id:string){
    const resposta = await prismaClient.usuario.findFirst({
        where:{
            id:id
        },
        select:{
            id:true, nome:true
        }
    })
    return resposta
  }


}

export { LoginServices };
