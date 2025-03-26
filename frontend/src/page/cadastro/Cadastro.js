import React, { useState } from "react";
import "../cadastro/cadastro.css"

export default function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [senha, setSenha] = useState('')
    const [confimeSenha, setConfimeSenha] = useState('')

    return (
        <div className="modal-container">
            <div className="modal-content">
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Nome"
                            value={nome}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="E-mail"
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="CPF"
                            value={cpf}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Data Nascimento"
                            value={dataNascimento}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Senha"
                            value={senha}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Confirme a Senha"
                            value={confimeSenha}
                        />
                    </div>
                </form>
                <div>
                    <button>
                        Cadastrar
                    </button>
                </div>
                <Link>
                    <p>Já tem uma Conta? faça login</p>
                </Link>
            </div>
        </div>
    )
}