import React, { useState } from "react";
import "./cadastro.css";
import "../../assets/style.css";

export default function Cadastro({ onSubmitCadastro, onSwitchToLogin }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confimeSenha, setConfimeSenha] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState('');
    const [registrando, setRegistrando] = useState(false);

    async function handleCadastroSubmit(e) {
        e.preventDefault();
        setError('');

        if (!nome || !cpf || !email || !senha || !confimeSenha) {
            setError("Preencha todos os campos");
            return;
        }

        if (senha !== confimeSenha) {
            setError("As senhas não coincidem.");
            return;
        }

        setRegistrando(true);
        try {
            const success = await onSubmitCadastro({
                nome,
                email,
                cpf,
                senha,
            });

            if (success) {
                alert('Cadastro realizado com sucesso! Faça o login para continuar.');
                onSwitchToLogin();
            } else {
                setError('Falha no cadastro. Verifique os dados ou tente outro email/CPF.');
            }

        } catch (err) {
             console.error("Erro no handleCadastroSubmit:", err);
            setError('Ocorreu um erro inesperado durante o cadastro.');
        } finally {
            setRegistrando(false);
        }
    }

    return (
        <form onSubmit={handleCadastroSubmit} className="modal_form_cadastro">
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                className="dialogo-cadastro-input-nome"
                onChange={(e) => setNome(e.target.value)}
                disabled={registrando}
                required
            />
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                className="dialogo-cadastro-input-email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={registrando}
                required
            />
            <input
                type="text"
                placeholder="CPF"
                value={cpf}
                className="dialogo-cadastro-input-cpf"
                onChange={(e) => setCpf(e.target.value)}
                disabled={registrando}
                required
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                className="dialogo-cadastro-input-senha"
                onChange={(e) => setSenha(e.target.value)}
                disabled={registrando}
                required
            />
            <input
                type="password"
                placeholder="Confirme a Senha"
                value={confimeSenha}
                className="dialogo-cadastro-input-confirme-senha"
                onChange={(e) => setConfimeSenha(e.target.value)}
                disabled={registrando}
                required
            />
            <button
                type="button"
                onClick={onSwitchToLogin}
                className="dialogo-cadastro-link-login"
                disabled={registrando}
            >
                Já tem uma Conta? faça login
            </button>
            <button className="dialogo-cadastro-button" type="submit" disabled={registrando}>
                {registrando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
        </form>
    );
}