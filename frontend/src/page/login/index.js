import React, { useState } from "react";
import "../login/login.css";

function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="modal-container">
            <div className="modal-content">
                <h2>{isLogin ? "Login" : "Cadastro"}</h2>
                <form>
                    {!isLogin &&(

                    <div className="form-group">
                        <input type="text" id="nome" name="nome" required placeholder="Nome:" />
                    </div>
                    )}
                    <div className="form-group">
                        <input type="text" id="cpf" name="cpf" required placeholder="CPF:" />
                    </div>
                    {!isLogin && (

                        <div className="form-group">
                            <input type="date" id="dataNascimento" name="dataNascimento" required />
                        </div>
                    )}
                    <div className="form-group">
                        <input type="password" id="password" name="password" required placeholder="Senha:" />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirmar Senha:" />
                        </div>
                    )}
                </form>

                <div className="button-login">
                    <div className='esqueci_senha'>

                        {isLogin && (
                            <a className="special-button">
                                Esqueci a senha
                            </a>
                        )}
                    </div>
                    <div className="login">

                        <a className="toggle-button" onClick={toggleForm}>
                            {isLogin ? "Cadastre-se" : "Já tem uma conta? Faça login"}
                        </a>
                        <button className="login-cadastro-button" type="submit">
                            {isLogin ? "Login" : "Cadastrar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
