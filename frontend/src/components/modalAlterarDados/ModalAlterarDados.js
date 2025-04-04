import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import iconeVoltar from '../../imagens/icon-voltar.svg'
import { AutenticadoContexto } from "../../Contexts/authContexts";

export default function ModalAlterarDados() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const { usuario } = useContext(AutenticadoContexto);


    async function alterarDadosUsuarios(e) {
        e.preventDefault();

        if (!nome || !senha) {
            console.log("Preencha todos os campos.");
            return;
        }

        try {
            const id = usuario.id;
            console.log("Enviando dados para alteração:", { nome, senha });
            const resposta = await api.put(`/AlteraDadosUsuario/${id}`, {
                nome,
                senha
            });
            console.log("Resposta da API", resposta);
            console.log('Cadastro alterado com sucesso!');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="modal-fundo">
            <div className="modal modal--login ">
            <Link to="/Perfil" className="modal-login-voltar">
                    <img src={iconeVoltar} alt="Voltar" />
                </Link>
            <h2 className="modal-login-titulo">Editar Usuarios</h2>
                <form onSubmit={alterarDadosUsuarios}>
                    <input
                        type="nome"
                        required
                        placeholder="Nome:"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="dialogo-login-input-email"
                    />
                    <input
                        type="password"
                        required
                        placeholder="Senha:"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="dialogo-login-input-senha"
                    />
                    <button type="submit" className="dialogo-login-button">Enviar</button>
                </form>
            </div>
        </div>
    )
}