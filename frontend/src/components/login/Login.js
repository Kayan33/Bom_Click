import React, { useState, useContext } from "react";
import "./login.css";

import "../../assets/style.css"
import iconeVoltar from "../../imagens/icon-voltar.svg"
import { AutenticadoContexto } from "../../Contexts/authContexts";

function Login() {
  const { loginEntrada } = useContext(AutenticadoContexto);

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function dadosLogin(e) {
      e.preventDefault();
      if (!email || !senha) {
          alert.warning('Prencha todos os campos');
          return;
      }
      try {
          console.log("Email:", email, "Senha", senha);
          await loginEntrada(email, senha);
      } catch (err) {
          console.log(err);

      }
  }

    return (
        <div className="modal-fundo">
        <div className="modal modal--login ">
          <a href="/" className="modal-login-voltar">
            <img src={iconeVoltar} alt="" />
          </a>
          <h2 className="modal-login-titulo">Login</h2>
            <form onSubmit={dadosLogin}>
              <input
                type="text"
                required
                placeholder="Email:"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
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
                        <a className="dialogo-button-esqueceu-senha" href="/">
              Esqueci a senha
                        </a>
                        <a className="dialogo-login-link-cadastro" href="/cadastro">
              Cadastre-se
                        </a>
                        <button className="dialogo-login-button" type="submit">
                Login
                        </button>
            </form>
        </div>
      </div>
    );
}

export default Login;
