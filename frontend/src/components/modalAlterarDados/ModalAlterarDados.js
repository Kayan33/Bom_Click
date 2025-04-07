import React, {useState, useContext} from "react";
import api from "../../services/api";
import { AutenticadoContexto } from "../../Contexts/authContexts";
import '../modalAlterarDados/modaleditarusuarios.css'
import { toast } from "react-toastify";


export default function ModalAlterarDados({ isOpen, onClose }) {
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
                nome: nome,
                senha: senha
            });
            console.log("Resposta da API", resposta);
           toast.success('Cadastro alterado com sucesso!');
            onClose()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="modal-fundo">
            <div className="modal modal--login ">
            <h2 className="modal-editar-titulo">Editar Usuarios</h2>
                <form onSubmit={alterarDadosUsuarios}>
                    <input
                        type="nome"
                        required
                        placeholder="Nome:"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="modal-editar-input-email"
                    />
                    <input
                        type="password"
                        required
                        placeholder="Senha:"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="modal-editar-input-senha"
                    />
                    <button type="submit" className="modal-editar-enviar-button">Enviar</button>
                    <button type="button" className="modal-editar-cancelar-button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}