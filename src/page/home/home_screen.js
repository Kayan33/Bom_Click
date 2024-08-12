import './header.css'
import logo from '../../imagens/bomClick.svg'
import carrinho from '../../imagens/carrinho.svg'
import perfil from '../../imagens/perfil.svg'
import { Link } from 'react-router-dom';

function HomeScreen() {
  return (
    <header className="container">
      <ul className='flex-container'>
        <li>
          <img src={logo} alt="Logo" className='logo' />
        </li>

        <li>
          <img src={carrinho} alt="Carrinho de compras" />
        </li>
      </ul>

      <section className='container-estastisticas'>
        <div className='estastisticas'>
          <h1>
            Tudo o que você precisa para economizar em um só lugar!
          </h1>
        </div>
        <div className='estastisticas'>

          <Link className="link">
            <div className="link-content">
              <img src={perfil} alt="Perfil" className="perfil-img" />
              <span className="link-text">Veja suas economias e estatísticas!</span>
            </div>
          </Link>
        </div>
      </section>
    </header>
  )
}

export default HomeScreen