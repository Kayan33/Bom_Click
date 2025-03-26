import React, { useState } from "react";
import "../login/login.css";

function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    return (
        <div className="modal-container">
            <div className="modal-content">
                <h2>Login</h2>
                <modal>
                    <form>
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
                </modal>
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
        </div>
    );
}

export default Login;
