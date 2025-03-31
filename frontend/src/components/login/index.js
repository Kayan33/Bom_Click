import React, { useState } from "react";
import "./login.css";
import iconeVoltar from "../../imagens/icon-voltar.svg"

function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    return (
        <div className="modal-content">
        <div className="modal modal--login ">
          <a href="/" className="modal-login-voltar">
            <img src={iconeVoltar} alt="" />
          </a>
          <h2 className="modal-login-titulo">Login</h2>
            <input
              type="text"
              required
              placeholder="Email:"
              // value={email}
              className="dialogo-login-input-email"
            />
            <input
              type="password"
              required
              placeholder="Senha:"
              // value={senha}
              className="dialogo-login-input-senha"
            />
          <a className="dialogo-button-esqueceu-senha">
            Esqueci a senha
          </a>
          <a className="dialogo-login-link-cadastro" href="/">
            Cadastre-se
          </a>
          <button className="dialogo-login-button" type="submit">
              Login
          </button>
        </div>
      </div>
    );
}

export default Login;
