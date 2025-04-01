import React, { useState } from "react";
import { Link } from 'react-router-dom'
import api from "../../services/api";
import "./cadastro.css"

export default function Cadastro() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [cep, setCep] = useState('')
    const [bairro, setBairro] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [senha, setSenha] = useState('')
    const [confimeSenha, setConfimeSenha] = useState('')

    // const formatarData = (data) => {
    //     return data;
    // }

    async function CadastroUsuarios(e) {
        try {
            e.preventDefault()

            if (!nome || !cpf || !dataNascimento || !email || !senha || !cep || !bairro || !logradouro || !numero) {
                alert("Campo em Branco")
                return
            }

            if (senha !== confimeSenha) {
                alert("No campo 'Confirme a sua senha' a senha tem que ser a mesma digitada acima.")
                return
            }

            // const dataFormatada = formatarData(dataNascimento)

            // console.log('Data formatada para envio:', dataFormatada);


            await api.post('/CadastroUsuarios', {
                nome,
                cpf,
                dataNascimento,
                senha,
                cep,
                logradouro,
                bairro,
                numero,
                email,
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
                        type="date"
                        placeholder="Data Nascimento"
                        value={dataNascimento}
                        className="dialogo-cadastro-input-data-nascimento"
                        onChange={(e) => setDataNascimento(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="CEP"
                        value={cep}
                        className="dialogo-cadastro-input-cep"
                        onChange={(e) => setCep(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Bairro"
                        value={bairro}
                        className="dialogo-cadastro-input-bairro"
                        onChange={(e) => setBairro(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Logradouro"
                        value={logradouro}
                        className="dialogo-cadastro-input-logradouro"
                        onChange={(e) => setLogradouro(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="numero"
                        value={numero}
                        className="dialogo-cadastro-input-numero"
                        onChange={(e) => setNumero(e.target.value)}
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