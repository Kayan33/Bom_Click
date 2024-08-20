import './style.css';

function Login() {
    return (
      <div className="container">
        <h2>Login</h2>
        <form>
          <div>
            <input id="username" name="username" type="text" placeholder="CPF" />
          </div>
          <div>
            <input id="password" name="password" type="password" placeholder="Senha" />
          </div>
          <button type="submit">Login</button>
          <a href="/forgot-password">Esqueceu sua senha?</a>
        </form>
      </div>
    );
  }
  
  export default Login;
  