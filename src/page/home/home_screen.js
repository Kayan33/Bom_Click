import './header.css'
import logo from '../../imagens/bomClick.svg'
import carrinho from '../../imagens/carrinho.svg'
import perfil from '../../imagens/perfil.svg'
import { Link } from 'react-router-dom';

function HomeScreen() {
  return (
    <div className="cabecalho">
      <header className='cabecalho-lista'>
        <li >
          <img src={logo} alt="Logo" className='lista-logo' />
        </li>

        <li>
          <img src={carrinho} alt="Carrinho de compras" />
        </li>
      </header>

      <section className='cabecalho-estastisticas'>
        <div className='estastisticas'>
          <h1>
            Tudo o que você precisa para economizar em um só lugar!
          </h1>
        </div>
        <div className='estastisticas'>
          <Link to='/perfil'>
            <div className="estastisticas-link">
              <img src={perfil} alt="Perfil" className="perfil-img" />
              <span className="link-text">Veja suas economias e estatísticas!</span>
            </div>
          </Link>
        </div>
      </section>
    </div>

  )
}

export default HomeScreen