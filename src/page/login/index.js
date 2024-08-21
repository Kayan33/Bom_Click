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
                    <div className="form-group">
                        <input type="email" id="email" name="email" required placeholder="CPF:" />
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" required placeholder="Senha:" />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="confirmar senha:" />
                        </div>
                    )}
                </form>
                <div className="button-login">

                <button className="toggle-button" onClick={toggleForm}>
                    {isLogin ? "Cadastre-se" : "Já tem uma conta? Faça login"}
                </button>
                    <button className="login-cadastro-button" type="submit">{isLogin ? "Login" : "cadastrar"}  </button>

                </div>
            </div>
        </div>
    );
}

export default Login;