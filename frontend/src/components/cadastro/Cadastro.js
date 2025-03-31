import React, { useState } from "react";
import { Link } from 'react-router-dom'
import "./cadastro.css"

export default function Cadastro() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [senha, setSenha] = useState('')
    const [confimeSenha, setConfimeSenha] = useState('')

    return (
        <div className="modal-content">
            <div className="modal modal--cadastro">
            <h2 className="modal-cadastro-titulo">
                Cadastro
            </h2>
            <input
            type="text"
            placeholder="Nome"
            value={nome}
            className="dialogo-cadastro-input-nome"
            />

            <input
            type="text"
            placeholder="E-mail"
            value={email}
            className="dialogo-cadastro-input-email"
            />

            <input
            type="text"
            placeholder="CPF"
            value={cpf}
            className="dialogo-cadastro-input-cpf"
            />

            <input
            type="text"
            placeholder="Data Nascimento"
            value={dataNascimento}
            className="dialogo-cadastro-input-data-nascimento"
            />

            <input
            type="text"
            placeholder="Senha"
            value={senha}
            className="dialogo-cadastro-input-senha"
            />

            <input
            type="text"
            placeholder="Confirme a Senha"
            value={confimeSenha}
            className="dialogo-cadastro-input-confirme-senha"
            />
            <button className="dialogo-cadastro-button" type="submit">
                Cadastrar
            </button>
            
            <Link className="dialogo-cadastro-link-login">
                <p>Já tem uma Conta? faça login</p>
            </Link>
            </div>
        </div>
    )
}