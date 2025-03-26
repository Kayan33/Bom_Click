import React, { useState } from "react";
import "./login.css";
import iconeVoltar from "../../imagens/icon-voltar.svg"

function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    return (
        <div className="modal">
            <div className="modal-dialog">
                <a href="/">
                    <img src={iconeVoltar} alt="" />
                </a>
                <h2 className="modal-dialog-titulo">Login</h2>
                <dialog open className="dialog">
                    <form className="dialog-form">
                        <div className="form-group">
                            <input
                                type="text"
                                required placeholder="Email:"
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                required placeholder="Senha:"
                                value={senha}
                            />
                        </div>
                    </form>
                </dialog>
                <div className="button-login">
                    <div className='esqueci_senha'>
                        <a className="special-button">
                            Esqueci a senha
                        </a>
                    </div>
                    <div className="login">
                        <a>
                            <p>Cadastre-se</p>
                        </a>
                        <button className="login-cadastro-button" type="submit">
                            <p>Login</p>
                        </button>
                    </div>
                </div>
            </div>

            {/* <div class="modal">
                <div class="div1">1</div>
                <div class="div2">2</div>
                <div class="div3">3</div>
                <div class="div4">4</div>
                <div class="div5">5</div>
                <div class="div6">6</div>
                <div class="div7">7</div>
            </div> */}

        </div>

    );
}

export default Login;
