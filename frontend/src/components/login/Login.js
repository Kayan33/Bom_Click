import React, { useState, useContext } from "react";
import "./login.css";
import "../../assets/style.css";
import iconeVoltar from "../../imagens/icon-voltar.svg";
import { AutenticadoContexto } from "../../Contexts/authContexts"; 
import { Link } from "react-router-dom";
import Cadastro from "../cadastro/Cadastro"; 

export default function Login() {
    const [view, setView] = useState('login');
    const { loginEntrada, cadastrarUsuario } = useContext(AutenticadoContexto); 

    const [emailLogin, setEmailLogin] = useState('');
    const [senhaLogin, setSenhaLogin] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    async function handleLoginSubmit(e) {
        e.preventDefault();
        setErrorLogin('');
        if (!emailLogin || !senhaLogin) {
            setErrorLogin('Preencha email e senha.');
            return;
        }
        setIsLoggingIn(true);
        try {
            const success = await loginEntrada(emailLogin, senhaLogin);
            if (!success) {
                setErrorLogin('Email ou senha inválidos.');
            }
        } catch (err) {
             console.error("Erro no handleLoginSubmit:", err);
            setErrorLogin('Ocorreu um erro ao tentar fazer login.');
        } finally {
            setIsLoggingIn(false);
        }
    }

    const handleRegisterSubmit = async (cadastroData) => {
        const success = await cadastrarUsuario(cadastroData);
        return success;
    };
    
    

    return (
        <div className="modal-fundo">
            <div className="modal modal--login ">
                <Link to="/" className="modal-login-voltar">
                    <img src={iconeVoltar} alt="Voltar" />
                </Link>

                <h2 className="modal-login-titulo">{view === 'login' ? 'Login' : 'Cadastro'}</h2>

                {view === 'login' ? (
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            type="email"
                            required
                            placeholder="Email:"
                            value={emailLogin}
                            onChange={(e) => setEmailLogin(e.target.value)}
                            className="dialogo-login-input-email"
                            disabled={isLoggingIn}
                        />
                        <input
                            type="password"
                            required
                            placeholder="Senha:"
                            value={senhaLogin}
                            onChange={(e) => setSenhaLogin(e.target.value)}
                            className="dialogo-login-input-senha"
                            disabled={isLoggingIn}
                        />
                        {errorLogin && <p className="auth-error-message">{errorLogin}</p>}
                        <a className="dialogo-button-esqueceu-senha" href="/">
                            Esqueci a senha
                        </a>
                        <button
                            type="button"
                            onClick={() => setView('register')}
                            className="dialogo-login-link-cadastro"
                            disabled={isLoggingIn}
                         >
                            Não tem conta? Cadastre-se
                        </button>
                        <button className="dialogo-login-button" type="submit" disabled={isLoggingIn}>
                            {isLoggingIn ? 'Entrando...' : 'Login'}
                        </button>
                    </form>
                ) : (
                    <Cadastro
                        onSubmitCadastro={handleRegisterSubmit}
                        onSwitchToLogin={() => setView('login')}
                    />
                )}
            </div>
        </div>
    );
}