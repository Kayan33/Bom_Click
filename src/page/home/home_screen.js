import './header_home.css'
import logo from '../../imagens/bomClick.svg'
import carrinho from '../../imagens/carrinho.svg'
import perfil from '../../imagens/perfil.svg'
import { Link } from 'react-router-dom'

import confiancaLogo from '../../imagens/confiancaLogo.png'
import panelaoLogo from '../../imagens/panelaoLogo.png'
import tausteLogo from '../../imagens/tausteLogo.png'
import fotoCarne from '../../imagens/carne.png'

import { produtos } from '../../data/produtos.js';
import { useState } from 'react'



function HomeScreen() {
  const [setorSelecionado, setSetorSelecionado] = useState('Todos');

  const handleSetorClick = (setor) => {
    setSetorSelecionado(setor);
  };


  const produtosFiltrados = setorSelecionado === 'Todos' ? produtos : produtos.filter(produto => produto.setores === setorSelecionado);

  return (
    <div>
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

      <section className='cabecalho_promocoes'>
        <h1>Promoções do dia!</h1>
        <div className="promocoes-carrosel">
          <div className='promocoes-01'>
            {produtos.map(produto => (
              <div className='promocoes'>
                <div className='promocoes_img'>
                  <img src={produto.imagem} alt={produto.nome} />
                </div>
                <div className='promocoes_produtos'>
                  <h3>{produto.nome}</h3>
                  <span>R${produto.preco.toFixed(2)}</span>
                  <div>
                    <img src={produto.mercado} alt={produto.mercado} className='imagem-mercado' />
                    <button>Adicionar <br /> a compra</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='cabecalho_mercados'>
        <div className='mercados_flex'>
          <img src={confiancaLogo}></img>
          <img src={panelaoLogo}></img>
          <img src={tausteLogo}></img>
        </div>
      </section>

      <section className='cabecalho_setores'>
        <div className='promocoes-carrosel'>
          <div className='promocoes-01 setores-mercado'>
            <button className="button" onClick={() => handleSetorClick('Frios')}>Frios</button>
            <button className="button" onClick={() => handleSetorClick('Açougue')}>Açougue</button>
            <button className="button" onClick={() => handleSetorClick('Hortifrut')}>Hortifrut</button>
            <button className="button" onClick={() => handleSetorClick('Higiene')}>Higiene</button>
          </div>
        </div>
      </section>


      <div className="promocoes-carrosel">
  <ul className='secao_compras_produtos_lista'>
    {produtosFiltrados.map(produto => (
      <li key={produto.id} className='secao_compras_produtos_lista_item'>
        <article className='secao_compras_lista_item_produto'>
          <img 
            src={produto.imagem} 
            alt={produto.nome} 
            className='secao_compras_lista_item_produto_imagem' 
          />
          <h3 className='secao_compras_lista_item_produto_titulo'>
            {produto.nome}
          </h3>
          
          <div className='secao_compras_lista_item_produto_valores'>
            <h4 className='secao_compras_lista_item_produto_titulo secao_compras_lista_item_produto_titulo--preco'>
              R${produto.preco.toFixed(2)}
            </h4>
            <button className='secao_compras_lista_item_produto_comparar--preco'>
              Comparar Preço
            </button>
          </div>

          <div className='secao_compras_lista_item_produto_valores'>
            <button className='secao_compras_lista_item_produto_adicionar--carrinho'>
              Adicionar a Compra
            </button>
          </div>
        </article>
      </li>
    ))}
  </ul>
</div>


    </div>

  )
}

export default HomeScreen