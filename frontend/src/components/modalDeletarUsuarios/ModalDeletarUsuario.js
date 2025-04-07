import React, { useContext } from "react";
import {toast} from 'react-toastify'
import api from "../../services/api";
import { AutenticadoContexto } from "../../Contexts/authContexts";
import '../modalDeletarUsuarios/modaldeletarusuarios.css'
import { useNavigate } from "react-router-dom";

export default function ModalDeletarUsuarios({ isOpen, onClose }) {
    const { usuario, logout } = useContext(AutenticadoContexto);
    const navigate = useNavigate()

    async function deletarUsuarios() {
        try {
            const id = usuario.id
            const resposta = await api.delete(`/DeletaUsuario/${id}`)
            toast.success("Conta Apagada com Sucesso", resposta)
            onClose()
            logout()
            navigate('/paginaInicial')
        } catch (error) {
            toast.error('Erro ao apagar a conta')
            onClose()
        }
    }
    

    return (
        <div className="modal-fundo">
            <div className="modal modal--login ">
                <p className="modal-deletar-p">Apagar a conta ?</p>
                <form>
                    <button type="button" className="dialogo-deletar-button" onClick={deletarUsuarios}>Apagar</button>
                    <button type="button" className="dialogo-Cancelar-button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    )
}