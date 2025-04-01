import React, { useState } from "react";
import { Link } from 'react-router-dom'
import api from "../../services/api";
import "./cadastro.css"

export default function Cadastro() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')
    const [confimeSenha, setConfimeSenha] = useState('')
    
    async function CadastroUsuarios(e) {
        try {
            e.preventDefault()

            if (!nome || !cpf || !email || !senha ) {
                alert("Campo em Branco")
                return
            }

            if (senha !== confimeSenha) {
                alert("No campo 'Confirme a sua senha' a senha tem que ser a mesma digitada acima.")
                return
            }
        

            await api.post('/CadastroUsuarios', {
                nome,
                email,
                cpf,
                senha,
            })
            console.log('Cadastro Efetuado com Sucesso');

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="modal-content">
            <div className="modal modal--cadastro">

                <form onSubmit={CadastroUsuarios}>
                    <h2 className="modal-cadastro-titulo">
                        Cadastro
                    </h2>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        className="dialogo-cadastro-input-nome"
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="E-mail"
                        value={email}
                        className="dialogo-cadastro-input-email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        className="dialogo-cadastro-input-cpf"
                        onChange={(e) => setCpf(e.target.value)}
                    />


                    <input
                        type="text"
                        placeholder="Senha"
                        value={senha}
                        className="dialogo-cadastro-input-senha"
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Confirme a Senha"
                        value={confimeSenha}
                        className="dialogo-cadastro-input-confirme-senha"
                        onChange={(e) => setConfimeSenha(e.target.value)}
                    />
                    <Link to='/carrinho' className="dialogo-cadastro-link-login">
                        Já tem uma Conta? faça login
                    </Link>
                    <button className="dialogo-cadastro-button" type="submit">
                        Cadastrar
                    </button>
                </form>

            </div>
        </div>
    )
}